/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Images.ts":
/*!***********************!*\
  !*** ./src/Images.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Images\": () => (/* binding */ Images)\n/* harmony export */ });\nvar Images = /** @class */ (function () {\r\n    function Images(container, srcs) {\r\n        var _this = this;\r\n        this.images = [];\r\n        this.currentSrc = '';\r\n        this.currentSrc = srcs[0];\r\n        srcs.forEach(function (src) {\r\n            var img = document.createElement('img');\r\n            img.src = src;\r\n            img.id = src;\r\n            img.classList.add(\"image\");\r\n            container.appendChild(img);\r\n            _this.images.push(img);\r\n        });\r\n    }\r\n    Images.prototype.getCurrentSrc = function () {\r\n        return this.currentSrc;\r\n    };\r\n    Images.prototype.subscribeListeners = function (cb) {\r\n        var _this = this;\r\n        this.images.forEach(function (image) {\r\n            image.onclick = function () {\r\n                _this.currentSrc = image.getAttribute('src');\r\n                if (cb) {\r\n                    cb();\r\n                }\r\n            };\r\n        });\r\n    };\r\n    return Images;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack://mosaic-test/./src/Images.ts?");

/***/ }),

/***/ "./src/Puzzle.ts":
/*!***********************!*\
  !*** ./src/Puzzle.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Puzzle\": () => (/* binding */ Puzzle)\n/* harmony export */ });\nvar Puzzle = /** @class */ (function () {\r\n    function Puzzle(options) {\r\n        var width = options.container.offsetWidth / options.sideSize;\r\n        var height = options.container.offsetHeight / options.sideSize;\r\n        this.wrapper = Puzzle.createBlock(width, height);\r\n        this.puzzle = Puzzle.createBlock(width, height);\r\n        this.wrapper.appendChild(this.puzzle);\r\n        this.puzzle.draggable = true;\r\n        this.puzzle.style.backgroundImage = 'url(' + options.imageSrc + ')';\r\n        var posY = Math.floor(options.position / options.sideSize);\r\n        var posX = options.position % options.sideSize;\r\n        this.puzzle.style.backgroundPositionX = '-' + width * posX + 'px';\r\n        this.puzzle.style.backgroundPositionY = '-' + height * posY + 'px';\r\n        this.puzzle.classList.add(\"item\");\r\n    }\r\n    Puzzle.prototype.getElement = function () {\r\n        return this.wrapper;\r\n    };\r\n    Puzzle.prototype.getPuzzleElement = function () {\r\n        return this.puzzle;\r\n    };\r\n    Puzzle.prototype.move = function (x, y) {\r\n        this.puzzle.style.left = x + 'px';\r\n        this.puzzle.style.top = y + 'px';\r\n    };\r\n    Puzzle.prototype.remove = function () {\r\n        this.puzzle.remove();\r\n    };\r\n    Puzzle.createBlock = function (width, height) {\r\n        var block = document.createElement('div');\r\n        block.style.width = width + 'px';\r\n        block.style.height = height + 'px';\r\n        return block;\r\n    };\r\n    return Puzzle;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack://mosaic-test/./src/Puzzle.ts?");

/***/ }),

/***/ "./src/game.ts":
/*!*********************!*\
  !*** ./src/game.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Game\": () => (/* binding */ Game)\n/* harmony export */ });\n/* harmony import */ var _Puzzle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Puzzle */ \"./src/Puzzle.ts\");\n\r\nvar Game = /** @class */ (function () {\r\n    function Game(options) {\r\n        this.puzzles = [];\r\n        this.options = {\r\n            containers: {\r\n                backlog: null,\r\n                playground: null,\r\n                result: null\r\n            },\r\n            sideSize: 0,\r\n            imageSrc: ''\r\n        };\r\n        this.options = options;\r\n    }\r\n    Game.prototype.start = function () {\r\n        this.createGrid();\r\n        this.shufflePuzzles();\r\n        this.appendPuzzles();\r\n        this.subscribeMovementListeners();\r\n    };\r\n    Game.prototype.createGrid = function () {\r\n        var position = 0;\r\n        for (var i = 0; i < this.options.sideSize; i++) {\r\n            for (var j = 0; j < this.options.sideSize; j++) {\r\n                var puzzle = new _Puzzle__WEBPACK_IMPORTED_MODULE_0__.Puzzle({\r\n                    container: this.options.containers.backlog,\r\n                    sideSize: this.options.sideSize,\r\n                    position: position,\r\n                    imageSrc: this.options.imageSrc\r\n                });\r\n                this.puzzles.push(puzzle);\r\n                position++;\r\n            }\r\n        }\r\n    };\r\n    Game.prototype.appendPuzzles = function () {\r\n        var _a = this.options, containers = _a.containers, sideSize = _a.sideSize;\r\n        containers.backlog.style.gridTemplateColumns = \"repeat(\" + sideSize + \", 1fr)\";\r\n        this.puzzles.forEach(function (item) {\r\n            containers.backlog.appendChild(item.getElement());\r\n        });\r\n    };\r\n    Game.prototype.shufflePuzzles = function () {\r\n        var currentIndex = this.puzzles.length, temporaryValue, randomIndex;\r\n        while (0 !== currentIndex) {\r\n            randomIndex = Math.floor(Math.random() * currentIndex);\r\n            currentIndex -= 1;\r\n            temporaryValue = this.puzzles[currentIndex];\r\n            this.puzzles[currentIndex] = this.puzzles[randomIndex];\r\n            this.puzzles[randomIndex] = temporaryValue;\r\n        }\r\n    };\r\n    Game.prototype.subscribeMovementListeners = function () {\r\n        var _a = this.options.containers, playground = _a.playground, result = _a.result;\r\n        this.puzzles.forEach(function (puzzle) {\r\n            puzzle.getPuzzleElement().onmousedown = function () {\r\n                if (puzzle.getPuzzleElement().draggable) {\r\n                    puzzle.getPuzzleElement().style.position = 'absolute';\r\n                    puzzle.getPuzzleElement().style.zIndex = '10';\r\n                    playground.onmousemove = function (e) {\r\n                        console.log(e.pageY);\r\n                        puzzle.move(e.pageX - (window.innerWidth - result.offsetWidth * 2) / 2 - result.offsetWidth - puzzle.getPuzzleElement().offsetWidth / 2, e.pageY - puzzle.getPuzzleElement().offsetHeight / 2);\r\n                    };\r\n                    playground.onmouseup = function () {\r\n                        playground.onmousemove = null;\r\n                        puzzle.getPuzzleElement().onmouseup = null;\r\n                        puzzle.getPuzzleElement().style.position = 'static';\r\n                    };\r\n                    puzzle.getPuzzleElement().ondragstart = function () {\r\n                        return false;\r\n                    };\r\n                }\r\n                else {\r\n                    return;\r\n                }\r\n            };\r\n        });\r\n    };\r\n    return Game;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack://mosaic-test/./src/game.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./src/game.ts\");\n/* harmony import */ var _Images__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Images */ \"./src/Images.ts\");\n\r\n\r\nvar imagesSrc = [\r\n    'images/1.jpg',\r\n    'images/2.jpg',\r\n    'images/3.jpg',\r\n    'images/4.jpg',\r\n    'images/5.jpg',\r\n];\r\nfunction init() {\r\n    var backlog = document.getElementById(\"backlog\");\r\n    var playground = document.getElementById(\"playground\");\r\n    var result = document.getElementById(\"result\");\r\n    var imagesContainer = document.getElementById(\"images\");\r\n    if (backlog && playground && result && imagesContainer) {\r\n        var images = new _Images__WEBPACK_IMPORTED_MODULE_1__.Images(imagesContainer, imagesSrc);\r\n        var game = new _game__WEBPACK_IMPORTED_MODULE_0__.Game({\r\n            sideSize: 5,\r\n            containers: {\r\n                result: result, playground: playground, backlog: backlog\r\n            },\r\n            imageSrc: images.getCurrentSrc()\r\n        });\r\n        images.subscribeListeners(game.start);\r\n        game.start();\r\n    }\r\n}\r\ninit();\r\n\n\n//# sourceURL=webpack://mosaic-test/./src/index.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;