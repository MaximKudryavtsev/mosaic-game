import { Game } from "./game";
import { Images } from "./Images";

const imagesSrc = [
    'images/1.jpg',
    'images/2.jpg',
    'images/3.jpg',
    'images/4.jpg',
    'images/5.jpg',
]

function init() {
    const backlog = document.getElementById("backlog");
    const playground = document.getElementById("playground");
    const result = document.getElementById("result");
    const imagesContainer = document.getElementById("images");
    if (backlog && playground && result && imagesContainer) {
        const images = new Images(imagesContainer, imagesSrc);
        const game = new Game({
            sideSize: 5,
            containers: {
                result, playground, backlog
            },
            imageSrc: images.getCurrentSrc()
        })
        game.start();
        images.subscribeListeners(src => game.restart(src));
    }
}


init();
