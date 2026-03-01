export class Ground {
    private x: number = 0;
    private height: number = 100;

    update(dt: number, speed: number) {
        this.x -= speed * dt;
        if (this.x <= -20) {
            this.x = 0;
        }
    }

    draw(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
        const y = canvas.height - this.height;
        ctx.fillStyle = '#DEB887';
        ctx.fillRect(0, y, canvas.width, this.height);
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(0, y, canvas.width, 4);

        // Pattern on ground
        ctx.fillStyle = '#CD853F';
        for (let i = 0; i < canvas.width / 20 + 2; i++) {
            ctx.fillRect(this.x + i * 20, y + 10, 10, 10);
            ctx.fillRect(this.x + i * 20 + 10, y + 30, 10, 10);
        }
    }

    getHeight() {
        return this.height;
    }
}