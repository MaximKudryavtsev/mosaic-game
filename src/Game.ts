import { Puzzle } from "./Puzzle";
import { Cell } from "./Cell";

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
    private resultPuzzles: Cell[] = [];
    private options: GameOptions = {
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
        this.puzzles = Game.shufflePuzzles(this.puzzles);
        this.appendPuzzles();
        this.subscribeMovementListeners();
    }

    restart(options?: Partial<GameOptions>) {
        this.clear();
        this.options = {
            ...this.options,
            ...options
        };
        this.start();
    }

    private clear(): void {
        this.puzzles.forEach((item) => item.removeCell());
        this.resultPuzzles.forEach((item) => item.removeCell());
        this.puzzles = [];
        this.resultPuzzles = [];
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
                const cell = new Cell({
                    container: this.options.containers.result,
                    sideSize: this.options.sideSize,
                    position
                })
                this.puzzles.push(puzzle);
                this.resultPuzzles.push(cell);
                position++;
            }
        }
    }

    private appendPuzzles(): void {
        const {containers, sideSize} = this.options;
        containers.backlog.style.gridTemplateColumns = `repeat(${sideSize}, 1fr)`;
        containers.result.style.gridTemplateColumns = `repeat(${sideSize}, 1fr)`;
        this.puzzles.forEach((item) => {
            containers.backlog.appendChild(item.getCell())
        })
        this.resultPuzzles.forEach((cell) => {
            containers.result.appendChild(cell.getCell());
        })
    }

    private static shufflePuzzles<T>(array: T[]) {
        let currentIndex = array.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array
    }

    private isInResultBlock(x: number, y: number): boolean {
        const coords = this.options.containers.result.getBoundingClientRect();
        return coords.x <= -x + coords.x && coords.x + coords.width >= -x + coords.x && y >= coords.y && y <= coords.y + coords.height;
    }

    private removePuzzle(position: number): void {
        this.puzzles = this.puzzles.filter((item) => item.getPosition() !== position);
    }

    private subscribeMovementListeners() {
        const {playground, result} = this.options.containers;
        this.puzzles.forEach((puzzle, index) => {
                puzzle.getPuzzleElement().onmousedown = () => {
                    if (puzzle.getPuzzleElement().draggable) {
                        puzzle.getPuzzleElement().style.position = 'absolute';
                        puzzle.getPuzzleElement().style.zIndex = '10';
                        playground.onmousemove = (e) => {
                            const x = e.pageX - (window.innerWidth - result.offsetWidth * 2) / 2 - result.offsetWidth - puzzle.getPuzzleElement().offsetWidth / 2;
                            const y = e.pageY - puzzle.getPuzzleElement().offsetHeight / 2
                            puzzle.move(x, y)
                            playground.onmouseup = () => {
                                this.puzzles.forEach((item) => console.log(item.getCell()))
                                if (this.isInResultBlock(x, y)) {
                                    puzzle.getPuzzleElement().style.position = 'static';
                                    this.resultPuzzles[puzzle.getPosition()].appendToCell(puzzle.getPuzzleElement());
                                    puzzle.disableDraggable();
                                    this.removePuzzle(puzzle.getPosition());
                                    if (this.puzzles.length === 0) {
                                        setTimeout(() => {
                                            if (window.confirm("Game over")) {
                                                this.clear()
                                            }
                                        }, 500)
                                    }
                                } else {
                                    puzzle.getPuzzleElement().style.position = 'static';
                                }
                                playground.onmousemove = null;
                                puzzle.getPuzzleElement().onmouseup = null;
                            }
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
