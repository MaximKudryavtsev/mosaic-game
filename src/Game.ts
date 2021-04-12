import { Puzzle } from "./Puzzle";
import { Cell } from "./Cell";

interface Containers {
    backlog: HTMLElement;
    playground: HTMLElement;
    result: HTMLElement;
}

interface GameOptions {
    sideSize: number;
    imageSrc: string;
    containers: Containers
}

export class Game {
    private puzzles: Puzzle[] = [];
    private resultPuzzles: Cell[] = [];
    private options: GameOptions = {
        sideSize: 0,
        imageSrc: '',
        containers: {
            backlog: null,
            playground: null,
            result: null
        }
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
        this.options.containers = Game.createContainers();
        this.options = {
            ...this.options,
            ...options
        };
        this.start();
    }

    private static createContainers(): Containers {
        const wrapper = document.getElementById('wrapper');
        const backlog = document.createElement('div');
        const playground = document.createElement('div');
        const result = document.createElement('div');
        backlog.id = 'backlog';
        backlog.classList.add('result');
        backlog.classList.add('block');
        backlog.classList.add('no-border');
        playground.id = 'playground';
        playground.classList.add('play-ground');
        result.id = 'result';
        result.classList.add('result')
        result.classList.add('block')
        wrapper.appendChild(playground);
        playground.appendChild(result);
        playground.appendChild(backlog);

        return {
            backlog, result, playground
        }
    }

    private clear(): void {
        this.puzzles.forEach((item) => item.removeCell());
        this.resultPuzzles.forEach((item) => item.removeCell());
        this.puzzles = [];
        this.resultPuzzles = [];
        const {playground, result, backlog} = this.options.containers;
        playground.remove();
        result.remove();
        backlog.remove();
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
        const {sideSize} = this.options;
        this.options.containers.backlog.style.gridTemplateColumns = `repeat(${sideSize}, 1fr)`;
        this.options.containers.result.style.gridTemplateColumns = `repeat(${sideSize}, 1fr)`;
        this.puzzles.forEach((item) => {
            this.options.containers.backlog.appendChild(item.getCell())
        })
        this.resultPuzzles.forEach((cell) => {
            this.options.containers.result.appendChild(cell.getCell());
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

    private isPositionMatched(x: number, y: number, position: number): boolean {
        const { sideSize } = this.options;
        const coords = this.options.containers.result.getBoundingClientRect();
        const puzzle = this.puzzles[0];
        const puzzleWidth = puzzle.getPuzzleElement().offsetWidth;
        const puzzleHeight = puzzle.getPuzzleElement().offsetHeight;
        const posY = Math.floor(position / sideSize);
        const posX = position % sideSize;
        return x + coords.x + coords.width >= coords.x + posX * puzzleWidth - 10 && x + coords.x + coords.width <= coords.x + posX * puzzleWidth + puzzleWidth + 10
            && y + coords.y >= coords.y + posY * puzzleHeight - 10 && y + coords.y <= coords.y + posY * puzzleHeight + puzzleHeight + 10;
    }

    private removePuzzle(position: number): void {
        this.puzzles = this.puzzles.filter((item) => item.getPosition() !== position);
    }

    private subscribeMovementListeners() {
        const {playground, result} = this.options.containers;
        this.puzzles.forEach((puzzle) => {
                puzzle.getPuzzleElement().onmousedown = () => {
                    if (puzzle.getPuzzleElement().draggable) {
                        puzzle.getPuzzleElement().style.position = 'absolute';
                        puzzle.getPuzzleElement().style.zIndex = '10';
                        playground.onmousemove = (e) => {
                            const x = e.pageX - (window.innerWidth - result.offsetWidth * 2) / 2 - result.offsetWidth - puzzle.getPuzzleElement().offsetWidth / 2;
                            const y = e.pageY - puzzle.getPuzzleElement().offsetHeight / 2
                            puzzle.move(x, y)
                            this.isPositionMatched(x, y, puzzle.getPosition());
                            playground.onmouseup = () => {
                                if (this.isPositionMatched(x, y, puzzle.getPosition())) {
                                    puzzle.getPuzzleElement().style.position = 'static';
                                    this.resultPuzzles[puzzle.getPosition()].appendToCell(puzzle.getPuzzleElement());
                                    puzzle.disableDraggable();
                                    this.removePuzzle(puzzle.getPosition());
                                    if (this.puzzles.length === 0) {
                                        setTimeout(() => {
                                            if (window.confirm("Game over")) {
                                                this.restart()
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
