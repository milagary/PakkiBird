import { EventBus } from '../core/EventBus';

interface Toast {
    message: string;
    life: number;
    maxLife: number;
}

export class ToastManager {
    private toasts: Toast[] = [];

    constructor(private eventBus: EventBus) {
        this.eventBus.on('TOAST', (msg: string) => this.addToast(msg));
    }

    addToast(message: string) {
        this.toasts.push({ message, life: 3, maxLife: 3 });
    }

    update(dt: number) {
        for (let i = this.toasts.length - 1; i >= 0; i--) {
            this.toasts[i].life -= dt;
            if (this.toasts[i].life <= 0) {
                this.toasts.splice(i, 1);
            }
        }
    }

    draw(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
        if (this.toasts.length === 0) return;

        ctx.font = 'bold 20px sans-serif';
        ctx.textAlign = 'center';

        let yOffset = 50;
        for (const toast of this.toasts) {
            const alpha = Math.min(1, toast.life * 2);
            
            ctx.fillStyle = `rgba(0, 0, 0, ${alpha * 0.7})`;
            ctx.fillRect(canvas.width / 2 - 150, canvas.height - yOffset - 30, 300, 40);
            
            ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.fillText(toast.message, canvas.width / 2, canvas.height - yOffset - 3);

            yOffset += 50;
        }
    }
}