export class MenuScreen {
    constructor(private canvas: HTMLCanvasElement) {
        this.setupClickListeners();
    }

    private setupClickListeners() {
        window.addEventListener('click', (e) => {
            if (window.location.hash === '' || window.location.hash === '#') {
                const rect = this.canvas.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                // Simple hitboxes for links
                if (y > this.canvas.height - 60 && y < this.canvas.height - 20) {
                    if (x > this.canvas.width / 2 - 100 && x < this.canvas.width / 2 - 20) {
                        window.location.hash = 'credits';
                    } else if (x > this.canvas.width / 2 + 20 && x < this.canvas.width / 2 + 100) {
                        window.location.hash = 'changelog';
                    }
                }
            }
        });
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = 'white';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 4;
        ctx.textAlign = 'center';

        // Title
        ctx.font = 'bold 56px sans-serif';
        ctx.strokeText('PakkiBird', this.canvas.width / 2, this.canvas.height / 3);
        ctx.fillText('PakkiBird', this.canvas.width / 2, this.canvas.height / 3);

        // Subtitle
        ctx.font = '24px sans-serif';
        ctx.lineWidth = 2;
        ctx.strokeText('by PakkiBird Dev Team', this.canvas.width / 2, this.canvas.height / 3 + 40);
        ctx.fillText('by PakkiBird Dev Team', this.canvas.width / 2, this.canvas.height / 3 + 40);

        // Flashing text
        const flash = Math.floor(performance.now() / 500) % 2 === 0;
        if (flash) {
            ctx.font = 'bold 28px sans-serif';
            ctx.strokeText('Tap or Press Space to Play', this.canvas.width / 2, this.canvas.height / 2 + 50);
            ctx.fillText('Tap or Press Space to Play', this.canvas.width / 2, this.canvas.height / 2 + 50);
        }

        // Links
        ctx.font = '20px sans-serif';
        ctx.fillStyle = '#FFD700';
        ctx.fillText('Credits', this.canvas.width / 2 - 60, this.canvas.height - 40);
        ctx.fillText('Changelog', this.canvas.width / 2 + 60, this.canvas.height - 40);
    }
}