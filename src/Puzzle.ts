interface PuzzleOptions {
    container: HTMLElement;
    sideSize: number;
    position: number;
    imageSrc: string;
}

export class Puzzle {
    private readonly puzzle: HTMLElement;
    private readonly wrapper: HTMLElement;

    constructor(options: PuzzleOptions) {
        const width = options.container.offsetWidth / options.sideSize;
        const height = options.container.offsetHeight / options.sideSize;
        this.wrapper = Puzzle.createBlock(width, height);
        this.puzzle = Puzzle.createBlock(width, height);
        this.wrapper.appendChild(this.puzzle);
        this.puzzle.draggable = true;
        this.puzzle.style.backgroundImage = 'url('+ options.imageSrc +')'
        const posY = Math.floor(options.position / options.sideSize);
        const posX = options.position % options.sideSize;
        this.puzzle.style.backgroundPositionX = '-' + width * posX + 'px';
        this.puzzle.style.backgroundPositionY = '-' + height * posY + 'px';
        this.puzzle.classList.add("item");
    }

    getElement(): HTMLElement {
        return this.wrapper;
    }

    getPuzzleElement(): HTMLElement {
        return this.puzzle;
    }

    move(x: number, y: number): void {
        this.puzzle.style.left = x + 'px';
        this.puzzle.style.top = y + 'px';
    }

    removePuzzle(): void {
        this.puzzle.remove();
    }

    removeCell(): void {
        this.wrapper.remove();
    }

    private static createBlock(width: number, height: number): HTMLElement {
        const block = document.createElement('div');
        block.style.width = width + 'px';
        block.style.height = height + 'px';

        return block;
    }
}
