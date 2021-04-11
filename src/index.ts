import { Game } from "./game";

function init() {
    const startContainer = document.getElementById("startWrapper");
    if (startContainer) {
        const game = new Game(startContainer, 5)
        game.start();
    }
}

init();
