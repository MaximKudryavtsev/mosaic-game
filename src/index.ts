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
    const sideSizeInput = document.getElementById("sideSize") as HTMLInputElement;
    const submit = document.getElementById("submit");
    if (backlog && playground && result && imagesContainer && submit) {
        const images = new Images(imagesContainer, imagesSrc);
        const game = new Game({
            sideSize: 5,
            containers: {
                result, playground, backlog
            },
            imageSrc: images.getCurrentSrc()
        })
        game.start();
        images.subscribeListeners(src => game.restart({
            imageSrc: src
        }));
        submit.onclick = () => game.restart({
            sideSize: Number(sideSizeInput.value)
        })
    }
}

init();
