export class Ground {
    private x: number = 0;
    private height: number = 100;

    update(dt: number, speed: number) {
        this.x -= speed * dt;
        if (this.x <= -40) {
            this.x += 40;
        }
    }

    draw(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
        const y = canvas.height - this.height;
        ctx.fillStyle = '#ded895';
        ctx.fillRect(0, y, canvas.width, this.height);
        
        ctx.fillStyle = '#73bf2e';
        ctx.fillRect(0, y, canvas.width, 12);
        
        ctx.fillStyle = '#558022';
        ctx.fillRect(0, y + 12, canvas.width, 4);

        // Diagonal stripes
        ctx.fillStyle = '#d3ca7a';
        ctx.beginPath();
        const stripeWidth = 20;
        const totalStripes = Math.ceil(canvas.width / (stripeWidth * 2)) + 3;
        
        for (let i = 0; i < totalStripes; i++) {
            const startX = this.x + i * stripeWidth * 2;
            ctx.moveTo(startX, y + 16);
            ctx.lineTo(startX + stripeWidth, y + 16);
            ctx.lineTo(startX + stripeWidth - (this.height - 16), canvas.height);
            ctx.lineTo(startX - (this.height - 16), canvas.height);
        }
        ctx.fill();
        
        ctx.fillStyle = '#e8df9c';
        ctx.fillRect(0, y + 16, canvas.width, 2);
        
        ctx.fillStyle = '#543847';
        ctx.fillRect(0, y, canvas.width, 4);
    }

    getHeight() {
        return this.height;
    }
}