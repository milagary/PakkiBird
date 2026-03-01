export class Renderer {
    constructor(private ctx: CanvasRenderingContext2D, private canvas: HTMLCanvasElement) {}

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}