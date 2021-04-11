import { Puzzle } from "./Puzzle";

interface GameOptions {
    containers: {
        playground: HTMLElement;
        backlog: HTMLElement;
        result: HTMLElement;
    };
    sideSize: number;
    imageSrc: string;
}

export class Game {
    private puzzles: Puzzle[] = [];
    private readonly options: GameOptions = {
        containers: {
            backlog: null,
            playground: null,
            result: null
        },
        sideSize: 0,
        imageSrc: ''
    }

    constructor(options: GameOptions) {
        this.options = options;
    }

    start() {
        this.createGrid();
        this.shufflePuzzles();
        this.appendPuzzles();
        this.subscribeMovementListeners();
    }

    restart(newSrc: string) {
        this.clear();
        this.options.imageSrc = newSrc;
        this.start();
    }

    private clear(): void {
        this.puzzles.forEach((item) => item.removeCell());
        this.puzzles = [];
    }

    private createGrid(): void {
        let position = 0;

        for (let i = 0; i < this.options.sideSize; i++) {
            for (let j = 0; j < this.options.sideSize; j++) {
                const puzzle = new Puzzle({
                    container: this.options.containers.backlog,
                    sideSize: this.options.sideSize,
                    position,
                    imageSrc: this.options.imageSrc
                });
                this.puzzles.push(puzzle);
                position++;
            }
        }
    }

    private appendPuzzles(): void {
        const {containers, sideSize} = this.options;
        containers.backlog.style.gridTemplateColumns = `repeat(${sideSize}, 1fr)`;
        this.puzzles.forEach((item) => {
            containers.backlog.appendChild(item.getElement())
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

    private subscribeMovementListeners() {
        const {playground, result} = this.options.containers;
        this.puzzles.forEach((puzzle) => {
                puzzle.getPuzzleElement().onmousedown = () => {
                    if (puzzle.getPuzzleElement().draggable) {
                        puzzle.getPuzzleElement().style.position = 'absolute';
                        puzzle.getPuzzleElement().style.zIndex = '10';
                        playground.onmousemove = (e) => {
                            console.log(e.pageY)
                            puzzle.move(
                                e.pageX - (window.innerWidth - result.offsetWidth * 2) / 2 - result.offsetWidth - puzzle.getPuzzleElement().offsetWidth / 2,
                                e.pageY - puzzle.getPuzzleElement().offsetHeight / 2
                            )
                        }
                        playground.onmouseup = () => {
                            playground.onmousemove = null;
                            puzzle.getPuzzleElement().onmouseup = null;
                            puzzle.getPuzzleElement().style.position = 'static';
                        }
                        puzzle.getPuzzleElement().ondragstart = () => {
                            return false;
                        }
                    } else {
                        return;
                    }
                }
            }
        )
    }
}
