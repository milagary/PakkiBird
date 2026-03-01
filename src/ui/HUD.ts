import { ScoreSystem } from '../systems/ScoreSystem';
import { CheatEffects } from '../cheats/CheatEffects';

export class HUD {
    constructor(private scoreSystem: ScoreSystem, private cheatEffects: CheatEffects) {}

    draw(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
        ctx.fillStyle = 'white';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 3;
        
        // Current Score
        ctx.font = 'bold 48px sans-serif';
        ctx.textAlign = 'center';
        const scoreText = this.scoreSystem.getDisplayScore().toString();
        ctx.strokeText(scoreText, canvas.width / 2, 80);
        ctx.fillText(scoreText, canvas.width / 2, 80);

        // Best Score
        ctx.font = 'bold 24px sans-serif';
        ctx.textAlign = 'right';
        const bestText = `Best: ${this.scoreSystem.getBestScore()}`;
        ctx.strokeText(bestText, canvas.width - 20, 40);
        ctx.fillText(bestText, canvas.width - 20, 40);

        // Cheat Indicator
        ctx.textAlign = 'left';
        if (this.cheatEffects.noclip) {
            ctx.font = '32px sans-serif';
            ctx.fillText('👻', 20, 50);
        }
    }
}