import { CREDITS, ORG_NAME } from '../config/CreditsConfig';

export class CreditsScreen {
    constructor(private canvas: HTMLCanvasElement) {
        window.addEventListener('click', (e) => {
            if (window.location.hash === '#credits') {
                const rect = this.canvas.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                // Back button hit
                if (x > 20 && x < 100 && y > 20 && y < 60) {
                    window.location.hash = '';
                }
            }
        });
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = '#333';
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Back button
        ctx.fillStyle = '#555';
        ctx.fillRect(20, 20, 80, 40);
        ctx.fillStyle = 'white';
        ctx.font = '20px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Back', 60, 47);

        // Title
        ctx.font = 'bold 36px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(ORG_NAME, this.canvas.width / 2, 60);

        // Cards
        let y = 120;
        for (const credit of CREDITS) {
            ctx.fillStyle = '#444';
            ctx.fillRect(this.canvas.width / 2 - 180, y, 360, 100);
            
            ctx.fillStyle = '#FFD700';
            ctx.font = 'bold 24px sans-serif';
            ctx.fillText(credit.name, this.canvas.width / 2, y + 35);
            
            ctx.fillStyle = 'white';
            ctx.font = '18px sans-serif';
            ctx.fillText(credit.role, this.canvas.width / 2, y + 65);
            
            ctx.fillStyle = '#aaa';
            ctx.font = '16px sans-serif';
            ctx.fillText(`@${credit.github}`, this.canvas.width / 2, y + 85);

            y += 120;
            if (y > this.canvas.height - 100) break;
        }
    }
}