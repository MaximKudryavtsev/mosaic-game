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

/***/ "./src/Cell.ts":
/*!*********************!*\
  !*** ./src/Cell.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Cell\": () => (/* binding */ Cell)\n/* harmony export */ });\nclass Cell {\r\n    constructor(options) {\r\n        const width = options.container.offsetWidth / options.sideSize;\r\n        const height = options.container.offsetHeight / options.sideSize;\r\n        this.cell = this.createBlock(width, height);\r\n    }\r\n    createBlock(width, height) {\r\n        const block = document.createElement('div');\r\n        block.style.width = width + 'px';\r\n        block.style.height = height + 'px';\r\n        return block;\r\n    }\r\n    getCell() {\r\n        return this.cell;\r\n    }\r\n    removeCell() {\r\n        this.cell.remove();\r\n    }\r\n    appendToCell(element) {\r\n        this.cell.appendChild(element);\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://mosaic-test/./src/Cell.ts?");

/***/ }),

/***/ "./src/Game.ts":
/*!*********************!*\
  !*** ./src/Game.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Game\": () => (/* binding */ Game)\n/* harmony export */ });\n/* harmony import */ var _Puzzle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Puzzle */ \"./src/Puzzle.ts\");\n/* harmony import */ var _Cell__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Cell */ \"./src/Cell.ts\");\n\r\n\r\nclass Game {\r\n    constructor(options) {\r\n        this.puzzles = [];\r\n        this.resultPuzzles = [];\r\n        this.options = {\r\n            sideSize: 0,\r\n            imageSrc: ''\r\n        };\r\n        this.containers = {\r\n            backlog: null,\r\n            playground: null,\r\n            result: null\r\n        };\r\n        this.options = options;\r\n        this.containers = Game.createContainers();\r\n        const wrapper = document.getElementById('wrapper');\r\n        console.log(wrapper);\r\n    }\r\n    start() {\r\n        this.createGrid();\r\n        this.puzzles = Game.shufflePuzzles(this.puzzles);\r\n        this.appendPuzzles();\r\n        this.subscribeMovementListeners();\r\n    }\r\n    restart(options) {\r\n        this.clear();\r\n        this.options = Object.assign(Object.assign({}, this.options), options);\r\n        this.start();\r\n    }\r\n    reload() {\r\n        window.location.reload();\r\n    }\r\n    static createContainers() {\r\n        const backlog = document.createElement('div');\r\n        const playground = document.createElement('div');\r\n        const result = document.createElement('div');\r\n        backlog.id = 'backlog';\r\n        backlog.classList.add('result block no-border');\r\n        playground.id = 'playground';\r\n        playground.classList.add('play-ground');\r\n        result.id = 'result';\r\n        result.classList.add('result block');\r\n        const wrapper = document.getElementById('wrapper');\r\n        if (wrapper) {\r\n            wrapper.appendChild(playground);\r\n            playground.appendChild(result);\r\n            playground.appendChild(backlog);\r\n        }\r\n        return {\r\n            backlog, result, playground\r\n        };\r\n    }\r\n    clear() {\r\n        this.puzzles.forEach((item) => item.removeCell());\r\n        this.resultPuzzles.forEach((item) => item.removeCell());\r\n        this.puzzles = [];\r\n        this.resultPuzzles = [];\r\n        const { playground, result, backlog } = this.containers;\r\n        playground.remove();\r\n        result.remove();\r\n        backlog.remove();\r\n    }\r\n    createGrid() {\r\n        let position = 0;\r\n        for (let i = 0; i < this.options.sideSize; i++) {\r\n            for (let j = 0; j < this.options.sideSize; j++) {\r\n                const puzzle = new _Puzzle__WEBPACK_IMPORTED_MODULE_0__.Puzzle({\r\n                    container: this.containers.backlog,\r\n                    sideSize: this.options.sideSize,\r\n                    position,\r\n                    imageSrc: this.options.imageSrc\r\n                });\r\n                const cell = new _Cell__WEBPACK_IMPORTED_MODULE_1__.Cell({\r\n                    container: this.containers.result,\r\n                    sideSize: this.options.sideSize,\r\n                    position\r\n                });\r\n                this.puzzles.push(puzzle);\r\n                this.resultPuzzles.push(cell);\r\n                position++;\r\n            }\r\n        }\r\n    }\r\n    appendPuzzles() {\r\n        const { sideSize } = this.options;\r\n        this.containers.backlog.style.gridTemplateColumns = `repeat(${sideSize}, 1fr)`;\r\n        this.containers.result.style.gridTemplateColumns = `repeat(${sideSize}, 1fr)`;\r\n        this.puzzles.forEach((item) => {\r\n            this.containers.backlog.appendChild(item.getCell());\r\n        });\r\n        this.resultPuzzles.forEach((cell) => {\r\n            this.containers.result.appendChild(cell.getCell());\r\n        });\r\n    }\r\n    static shufflePuzzles(array) {\r\n        let currentIndex = array.length, temporaryValue, randomIndex;\r\n        while (0 !== currentIndex) {\r\n            randomIndex = Math.floor(Math.random() * currentIndex);\r\n            currentIndex -= 1;\r\n            temporaryValue = array[currentIndex];\r\n            array[currentIndex] = array[randomIndex];\r\n            array[randomIndex] = temporaryValue;\r\n        }\r\n        return array;\r\n    }\r\n    isInResultBlock(x, y) {\r\n        const coords = this.containers.result.getBoundingClientRect();\r\n        return coords.x <= -x + coords.x && coords.x + coords.width >= -x + coords.x && y >= coords.y && y <= coords.y + coords.height;\r\n    }\r\n    removePuzzle(position) {\r\n        this.puzzles = this.puzzles.filter((item) => item.getPosition() !== position);\r\n    }\r\n    subscribeMovementListeners() {\r\n        const { playground, result } = this.containers;\r\n        this.puzzles.forEach((puzzle, index) => {\r\n            puzzle.getPuzzleElement().onmousedown = () => {\r\n                if (puzzle.getPuzzleElement().draggable) {\r\n                    puzzle.getPuzzleElement().style.position = 'absolute';\r\n                    puzzle.getPuzzleElement().style.zIndex = '10';\r\n                    playground.onmousemove = (e) => {\r\n                        const x = e.pageX - (window.innerWidth - result.offsetWidth * 2) / 2 - result.offsetWidth - puzzle.getPuzzleElement().offsetWidth / 2;\r\n                        const y = e.pageY - puzzle.getPuzzleElement().offsetHeight / 2;\r\n                        puzzle.move(x, y);\r\n                        playground.onmouseup = () => {\r\n                            if (this.isInResultBlock(x, y)) {\r\n                                puzzle.getPuzzleElement().style.position = 'static';\r\n                                this.resultPuzzles[puzzle.getPosition()].appendToCell(puzzle.getPuzzleElement());\r\n                                puzzle.disableDraggable();\r\n                                this.removePuzzle(puzzle.getPosition());\r\n                                if (this.puzzles.length === 0) {\r\n                                    setTimeout(() => {\r\n                                        if (window.confirm(\"Game over\")) {\r\n                                            this.reload();\r\n                                        }\r\n                                    }, 500);\r\n                                }\r\n                            }\r\n                            else {\r\n                                puzzle.getPuzzleElement().style.position = 'static';\r\n                            }\r\n                            playground.onmousemove = null;\r\n                            puzzle.getPuzzleElement().onmouseup = null;\r\n                        };\r\n                    };\r\n                    puzzle.getPuzzleElement().ondragstart = () => {\r\n                        return false;\r\n                    };\r\n                }\r\n                else {\r\n                    return;\r\n                }\r\n            };\r\n        });\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://mosaic-test/./src/Game.ts?");

/***/ }),

/***/ "./src/Images.ts":
/*!***********************!*\
  !*** ./src/Images.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Images\": () => (/* binding */ Images)\n/* harmony export */ });\nclass Images {\r\n    constructor(container, srcs) {\r\n        this.images = [];\r\n        this.currentSrc = '';\r\n        this.currentSrc = srcs[0];\r\n        srcs.forEach((src) => {\r\n            const img = document.createElement('img');\r\n            img.src = src;\r\n            img.id = src;\r\n            img.classList.add(\"image\");\r\n            container.appendChild(img);\r\n            this.images.push(img);\r\n        });\r\n    }\r\n    getCurrentSrc() {\r\n        return this.currentSrc;\r\n    }\r\n    subscribeListeners(cb) {\r\n        this.images.forEach((image) => {\r\n            image.onclick = () => {\r\n                this.currentSrc = image.getAttribute('src');\r\n                if (cb) {\r\n                    cb(this.currentSrc);\r\n                }\r\n            };\r\n        });\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://mosaic-test/./src/Images.ts?");

/***/ }),

/***/ "./src/Puzzle.ts":
/*!***********************!*\
  !*** ./src/Puzzle.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Puzzle\": () => (/* binding */ Puzzle)\n/* harmony export */ });\n/* harmony import */ var _Cell__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Cell */ \"./src/Cell.ts\");\n\r\nclass Puzzle extends _Cell__WEBPACK_IMPORTED_MODULE_0__.Cell {\r\n    constructor(options) {\r\n        super(options);\r\n        this.position = options.position;\r\n        const width = options.container.offsetWidth / options.sideSize;\r\n        const height = options.container.offsetHeight / options.sideSize;\r\n        this.puzzle = this.createBlock(width, height);\r\n        this.appendToCell(this.puzzle);\r\n        this.puzzle.draggable = true;\r\n        this.puzzle.style.backgroundImage = 'url(' + options.imageSrc + ')';\r\n        const posY = Math.floor(options.position / options.sideSize);\r\n        const posX = options.position % options.sideSize;\r\n        this.puzzle.style.backgroundPositionX = '-' + width * posX + 'px';\r\n        this.puzzle.style.backgroundPositionY = '-' + height * posY + 'px';\r\n        this.puzzle.classList.add(\"item\");\r\n    }\r\n    getPuzzleElement() {\r\n        return this.puzzle;\r\n    }\r\n    move(x, y) {\r\n        this.puzzle.style.left = x + 'px';\r\n        this.puzzle.style.top = y + 'px';\r\n    }\r\n    disableDraggable() {\r\n        this.puzzle.draggable = false;\r\n    }\r\n    getPosition() {\r\n        return this.position;\r\n    }\r\n    removePuzzle() {\r\n        this.puzzle.remove();\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://mosaic-test/./src/Puzzle.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Game */ \"./src/Game.ts\");\n/* harmony import */ var _Images__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Images */ \"./src/Images.ts\");\n\r\n\r\nconst imagesSrc = __webpack_require__(/*! ../public/images.json */ \"./public/images.json\");\r\nfunction init() {\r\n    const backlog = document.getElementById(\"backlog\");\r\n    const playground = document.getElementById(\"playground\");\r\n    const result = document.getElementById(\"result\");\r\n    const imagesContainer = document.getElementById(\"images\");\r\n    const sideSizeInput = document.getElementById(\"sideSize\");\r\n    const submit = document.getElementById(\"submit\");\r\n    const reset = document.getElementById(\"reset\");\r\n    if (backlog && playground && result && imagesContainer && submit && reset) {\r\n        const images = new _Images__WEBPACK_IMPORTED_MODULE_1__.Images(imagesContainer, imagesSrc.images);\r\n        const initialOptions = {\r\n            sideSize: 4,\r\n            containers: {\r\n                result, playground, backlog\r\n            },\r\n            imageSrc: images.getCurrentSrc()\r\n        };\r\n        const game = new _Game__WEBPACK_IMPORTED_MODULE_0__.Game(initialOptions);\r\n        game.start();\r\n        images.subscribeListeners(src => game.restart({\r\n            imageSrc: src\r\n        }));\r\n        submit.onclick = () => game.restart({\r\n            sideSize: Number(sideSizeInput.value)\r\n        });\r\n        reset.onclick = () => {\r\n            game.reload();\r\n        };\r\n    }\r\n}\r\ninit();\r\n\n\n//# sourceURL=webpack://mosaic-test/./src/index.ts?");

/***/ }),

/***/ "./public/images.json":
/*!****************************!*\
  !*** ./public/images.json ***!
  \****************************/
/***/ ((module) => {

eval("module.exports = JSON.parse('{\"images\":[\"images/1.jpg\",\"images/2.jpg\",\"images/3.jpg\",\"images/4.jpg\",\"images/5.jpg\"]}');\n\n//# sourceURL=webpack://mosaic-test/./public/images.json?");

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