import { Game } from "./Game";
import { Images } from "./Images";

const imagesSrc = require('../public/images.json');
const MAX_SIDE_SIZE = 25;

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
        submit.onclick = () => {
            const sideSize = Number(sideSizeInput.value)
            if (sideSize <= MAX_SIDE_SIZE) {
                game.restart({
                    sideSize
                })
            } else {
                alert('Максимальный размер сетки не должен превышать 25!')
            }
        }
        reset.onclick = () => {
            game.restart();
        };
    }
}

init();
