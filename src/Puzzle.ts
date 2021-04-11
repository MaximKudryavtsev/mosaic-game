import { Cell, CellOptions } from "./Cell";

interface PuzzleOptions extends CellOptions {
    imageSrc: string;
    container: HTMLElement;
    sideSize: number;
    position: number;
}

export class Puzzle extends Cell {
    private readonly puzzle: HTMLElement;
    private readonly position: number;

    constructor(options: PuzzleOptions) {
        super(options);
        this.position = options.position;
        const width = options.container.offsetWidth / options.sideSize;
        const height = options.container.offsetHeight / options.sideSize;
        this.puzzle = this.createBlock(width, height);
        this.appendToCell(this.puzzle);
        this.puzzle.draggable = true;
        this.puzzle.style.backgroundImage = 'url('+ options.imageSrc +')'
        const posY = Math.floor(options.position / options.sideSize);
        const posX = options.position % options.sideSize;
        this.puzzle.style.backgroundPositionX = '-' + width * posX + 'px';
        this.puzzle.style.backgroundPositionY = '-' + height * posY + 'px';
        this.puzzle.classList.add("item");
    }

    getPuzzleElement(): HTMLElement {
        return this.puzzle;
    }

    move(x: number, y: number): void {
        this.puzzle.style.left = x + 'px';
        this.puzzle.style.top = y + 'px';
    }

    disableDraggable(): void {
        this.puzzle.draggable = false;
    }

    getPosition(): number {
        return this.position;
    }

    removePuzzle(): void {
        this.puzzle.remove();
    }
}
