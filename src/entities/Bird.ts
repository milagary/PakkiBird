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

        ctx.lineWidth = 2;
        ctx.strokeStyle = '#543847';

        // Body
        ctx.fillStyle = '#f8e71c';
        ctx.beginPath();
        ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Eye
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(this.radius * 0.4, -this.radius * 0.4, this.radius * 0.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Pupil
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(this.radius * 0.6, -this.radius * 0.4, this.radius * 0.15, 0, Math.PI * 2);
        ctx.fill();

        // Beak (Top)
        ctx.fillStyle = '#f5511e';
        ctx.beginPath();
        ctx.moveTo(this.radius * 0.5, 0);
        ctx.lineTo(this.radius * 1.3, 0);
        ctx.lineTo(this.radius * 1.1, -this.radius * 0.3);
        ctx.lineTo(this.radius * 0.7, -this.radius * 0.3);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Beak (Bottom)
        ctx.fillStyle = '#f5511e';
        ctx.beginPath();
        ctx.moveTo(this.radius * 0.4, 0);
        ctx.lineTo(this.radius * 1.1, this.radius * 0.3);
        ctx.lineTo(this.radius * 0.6, this.radius * 0.4);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Wing
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.ellipse(-this.radius * 0.3, this.radius * 0.2, this.radius * 0.5, this.radius * 0.3, -0.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.restore();
    }
}