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
        gradient.addColorStop(0, '#4ec0ca');
        gradient.addColorStop(1, '#c1ecf8');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Clouds
        ctx.fillStyle = 'white';
        this.clouds.forEach(cloud => {
            ctx.beginPath();
            ctx.ellipse(cloud.x, cloud.y, 40 * cloud.scale, 20 * cloud.scale, 0, 0, Math.PI * 2);
            ctx.fill();
        });

        // City silhouette
        const yBase = canvas.height - 100;
        
        ctx.fillStyle = '#d4efdf';
        ctx.beginPath();
        ctx.moveTo(0, yBase);
        ctx.lineTo(0, yBase - 40);
        ctx.lineTo(30, yBase - 40);
        ctx.lineTo(30, yBase - 60);
        ctx.lineTo(80, yBase - 60);
        ctx.lineTo(80, yBase - 30);
        ctx.lineTo(120, yBase - 30);
        ctx.lineTo(120, yBase - 70);
        ctx.lineTo(160, yBase - 70);
        ctx.lineTo(160, yBase - 50);
        ctx.lineTo(200, yBase - 50);
        ctx.lineTo(200, yBase - 80);
        ctx.lineTo(240, yBase - 80);
        ctx.lineTo(240, yBase - 40);
        ctx.lineTo(canvas.width, yBase - 40);
        ctx.lineTo(canvas.width, yBase);
        ctx.fill();

        ctx.fillStyle = '#a6e5a6';
        ctx.beginPath();
        ctx.moveTo(0, yBase);
        ctx.lineTo(0, yBase - 20);
        ctx.lineTo(20, yBase - 20);
        ctx.lineTo(20, yBase - 40);
        ctx.lineTo(60, yBase - 40);
        ctx.lineTo(60, yBase - 20);
        ctx.lineTo(100, yBase - 20);
        ctx.lineTo(100, yBase - 50);
        ctx.lineTo(140, yBase - 50);
        ctx.lineTo(140, yBase - 30);
        ctx.lineTo(180, yBase - 30);
        ctx.lineTo(180, yBase - 60);
        ctx.lineTo(220, yBase - 60);
        ctx.lineTo(220, yBase - 20);
        ctx.lineTo(canvas.width, yBase - 20);
        ctx.lineTo(canvas.width, yBase);
        ctx.fill();
        
        // Bushes / trees
        ctx.fillStyle = '#59d659';
        ctx.beginPath();
        for (let i = 0; i < canvas.width; i += 40) {
            ctx.arc(i + 20, yBase, 25, Math.PI, 0);
        }
        ctx.fill();
        
        ctx.fillStyle = '#543847';
        ctx.fillRect(0, yBase, canvas.width, 2);
    }
}