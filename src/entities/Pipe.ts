export class Pipe {
    public x: number = 0;
    public topHeight: number = 0;
    public bottomY: number = 0;
    public width: number = 60;
    public active: boolean = false;
    public passed: boolean = false;

    init(x: number, topHeight: number, gap: number, _canvasHeight: number) {
        this.x = x;
        this.topHeight = topHeight;
        this.bottomY = topHeight + gap;
        this.active = true;
        this.passed = false;
    }

    draw(ctx: CanvasRenderingContext2D, canvasHeight: number) {
        if (!this.active) return;

        ctx.fillStyle = '#4CAF50';
        
        // Top pipe
        ctx.fillRect(this.x, 0, this.width, this.topHeight);
        ctx.fillStyle = '#388E3C';
        ctx.fillRect(this.x - 4, this.topHeight - 20, this.width + 8, 20);

        // Bottom pipe
        ctx.fillStyle = '#4CAF50';
        ctx.fillRect(this.x, this.bottomY, this.width, canvasHeight - this.bottomY);
        ctx.fillStyle = '#388E3C';
        ctx.fillRect(this.x - 4, this.bottomY, this.width + 8, 20);
    }
}