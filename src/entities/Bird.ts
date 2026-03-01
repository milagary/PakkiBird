import { MathUtils } from '../utils/MathUtils';
import { GameConfig } from '../config/GameConfig';

export class Bird {
    public x: number = 0;
    public y: number = 0;
    public velocity: number = 0;
    public radius: number = 15;
    
    reset(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.velocity = 0;
    }

    getRotation(): number {
        const factor = MathUtils.clamp(this.velocity / GameConfig.TERMINAL_VELOCITY, -1, 1);
        if (factor < 0) {
            return MathUtils.lerp(0, -20 * Math.PI / 180, -factor);
        } else {
            return MathUtils.lerp(0, 90 * Math.PI / 180, factor);
        }
    }

    draw(ctx: CanvasRenderingContext2D, isBig: boolean) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.getRotation());
        
        const scale = isBig ? 2.5 : 1;
        ctx.scale(scale, scale);

        // Body
        ctx.fillStyle = '#FFD700';
        ctx.beginPath();
        ctx.ellipse(0, 0, this.radius, this.radius * 0.8, 0, 0, Math.PI * 2);
        ctx.fill();

        // Eye
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(this.radius * 0.4, -this.radius * 0.2, this.radius * 0.15, 0, Math.PI * 2);
        ctx.fill();

        // Beak
        ctx.fillStyle = '#FF8C00';
        ctx.beginPath();
        ctx.moveTo(this.radius * 0.8, 0);
        ctx.lineTo(this.radius * 1.5, 0);
        ctx.lineTo(this.radius * 0.8, this.radius * 0.4);
        ctx.fill();

        ctx.restore();
    }
}