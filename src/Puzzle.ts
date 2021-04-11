export class Puzzle {
    private readonly puzzle: HTMLElement;
    private readonly wrapper: HTMLElement;

    constructor(container: HTMLElement, sideSize: number, position: number) {
        const width = container.offsetWidth / sideSize;
        const height = container.offsetHeight / sideSize;
        this.wrapper = this.createBlock(width, height);
        this.puzzle = this.createBlock(width, height);
        this.wrapper.style.overflow = 'hidden';
        this.wrapper.appendChild(this.puzzle);
        this.puzzle.draggable = true;
        const posY = Math.floor(position / sideSize);
        const posX = position % sideSize;
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

    private createBlock(width: number, height: number): HTMLElement {
        const block = document.createElement('div');
        block.style.width = width + 'px';
        block.style.height = height + 'px';

        return block;
    }
}
