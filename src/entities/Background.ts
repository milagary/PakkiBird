export class Background {
    private clouds: { x: number, y: number, scale: number }[] = [];

    constructor() {
        this.reset();
    }

    reset() {
        this.clouds = [
            { x: 100, y: 150, scale: 1 },
            { x: 300, y: 100, scale: 1.5 },
            { x: 500, y: 200, scale: 0.8 },
            { x: 700, y: 120, scale: 1.2 }
        ];
    }

    update(dt: number, speed: number) {
        this.clouds.forEach(cloud => {
            cloud.x -= speed * dt;
            if (cloud.x < -100) {
                cloud.x = 800; // Wrap around
            }
        });
    }

    draw(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, '#87CEEB');
        gradient.addColorStop(1, '#E0F0FF');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = 'white';
        this.clouds.forEach(cloud => {
            ctx.beginPath();
            ctx.ellipse(cloud.x, cloud.y, 40 * cloud.scale, 20 * cloud.scale, 0, 0, Math.PI * 2);
            ctx.fill();
        });
    }
}