export class Images {
    private images: HTMLElement[] = [];
    private currentSrc = '';

    constructor(container: HTMLElement, srcs: string[]) {
        this.currentSrc = srcs[0];
        srcs.forEach((src) => {
            const img = document.createElement('img');
            img.src = src;
            img.id = src;
            img.classList.add("image");
            container.appendChild(img);
            this.images.push(img);
        });
    }

    getCurrentSrc(): string {
        return this.currentSrc;
    }

    subscribeListeners(cb?: (src: string) => void): void {
        this.images.forEach((image) => {
            image.onclick = () => {
                this.currentSrc = image.getAttribute('src');
                if (cb) {
                    cb(this.currentSrc);
                }
            }
        })
    }
}
