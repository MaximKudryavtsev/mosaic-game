export interface CellOptions {
    container: HTMLElement;
    sideSize: number;
    position: number;
    className?: string;
}

export class Cell {
    protected readonly cell: HTMLElement;

    constructor(options: CellOptions) {
        const width = options.container.offsetWidth / options.sideSize;
        const height = options.container.offsetHeight / options.sideSize;
        this.cell = this.createBlock(width, height);
        if (options.className) {
            this.cell.classList.add(options.className)
        }
    }

    protected createBlock(width: number, height: number): HTMLElement {
        const block = document.createElement('div');
        block.style.width = width + 'px';
        block.style.height = height + 'px';
        return block;
    }

    getCell(): HTMLElement {
        return this.cell;
    }

    removeCell(): void {
        this.cell.remove();
    }

    appendToCell<T>(element: HTMLElement): void {
        this.cell.appendChild(element);
    }
}
