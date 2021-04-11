import { Game } from "./game";
import { Images } from "./Images";

const imagesSrc = require('../public/images.json');

function init() {
    const backlog = document.getElementById("backlog");
    const playground = document.getElementById("playground");
    const result = document.getElementById("result");
    const imagesContainer = document.getElementById("images");
    const sideSizeInput = document.getElementById("sideSize") as HTMLInputElement;
    const submit = document.getElementById("submit");
    const reset = document.getElementById("reset");
    if (backlog && playground && result && imagesContainer && submit && reset) {
        const images = new Images(imagesContainer, imagesSrc.images);
        const initialOptions = {
            sideSize: 4,
            containers: {
                result, playground, backlog
            },
            imageSrc: images.getCurrentSrc()
        }
        const game = new Game(initialOptions)
        game.start();
        images.subscribeListeners(src => game.restart({
            imageSrc: src
        }));
        submit.onclick = () => game.restart({
            sideSize: Number(sideSizeInput.value)
        })
        reset.onclick = () => {
            game.restart(initialOptions);
            sideSizeInput.value = String(initialOptions.sideSize)
        };
    }
}

init();
