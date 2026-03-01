import { CHANGELOG } from '../config/ChangelogConfig';

export class ChangelogScreen {
    constructor(private canvas: HTMLCanvasElement) {
        window.addEventListener('click', (e) => {
            if (window.location.hash === '#changelog') {
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
        ctx.fillText('Changelog', this.canvas.width / 2, 60);

        // Entries
        ctx.textAlign = 'left';
        let y = 120;
        for (const entry of CHANGELOG) {
            ctx.fillStyle = '#FFD700';
            ctx.font = 'bold 24px sans-serif';
            ctx.fillText(`v${entry.version} (${entry.date})`, 40, y);
            y += 30;

            ctx.fillStyle = 'white';
            ctx.font = '18px sans-serif';
            for (const change of entry.changes) {
                ctx.fillText(`• ${change}`, 60, y);
                y += 25;
            }
            y += 20;
            
            if (y > this.canvas.height - 50) break; // Simple truncation
        }
    }
}