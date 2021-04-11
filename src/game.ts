import { Puzzle } from "./Puzzle";

export class Game {
    private puzzles: Puzzle[] = [];

    constructor(container: HTMLElement, sideSize: number) {
        let position = 0;

        for (let i = 0; i < sideSize; i++) {
            for (let j = 0; j < sideSize; j++) {
                const puzzle = new Puzzle(container, sideSize, position);
                this.puzzles.push(puzzle);
                position++;
            }
        }
        this.shufflePuzzles();
        this.appendPuzzles(container, sideSize);
    }

    start() {
        this.listenMove();
    }

    private appendPuzzles(container: HTMLElement, sideSize: number): void {
        container.style.gridTemplateColumns = `repeat(${sideSize}, 1fr)`;
        this.puzzles.forEach((item) => {
            container.appendChild(item.getElement())
        })
    }

    private shufflePuzzles() {
        let currentIndex = this.puzzles.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = this.puzzles[currentIndex];
            this.puzzles[currentIndex] = this.puzzles[randomIndex];
            this.puzzles[randomIndex] = temporaryValue;
        }
    }

    private listenMove() {
        const playGround = document.getElementById("playground");
        this.puzzles.forEach((puzzle) => {
                puzzle.getPuzzleElement().onmousedown = () => {
                    if (puzzle.getPuzzleElement().draggable) {
                        puzzle.getPuzzleElement().style.position = 'absolute';
                        puzzle.getPuzzleElement().style.zIndex = '10';

                        playGround.onmousemove = (e) => {
                            puzzle.move(
                                e.pageX - (puzzle.getPuzzleElement().offsetWidth + (window.innerWidth - 600)) / 2,
                                e.pageY - 400 - puzzle.getPuzzleElement().offsetHeight / 2
                            )
                        }

                        playGround.onmouseup = () => {
                            playGround.onmousemove = null;
                            puzzle.getPuzzleElement().onmouseup = null;
                            puzzle.getPuzzleElement().style.position = 'static';
                        }

                        puzzle.getPuzzleElement().ondragstart = () => {
                            return false;
                        }
                    } else {
                        return
                    }
                }
            }
        )
    }
}
