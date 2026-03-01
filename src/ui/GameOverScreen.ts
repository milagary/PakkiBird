import { ScoreSystem } from '../systems/ScoreSystem';

export class GameOverScreen {
    private messages = [
        "skill issue",
        "L + ratio + didn't flap",
        "You flew straight into capitalism",
        "Imagine losing to a green rectangle",
        "F in the chat",
        "This bird has a family, you know",
        "The pipe won. Again.",
        "404: Flight not found",
        "GG EZ (it was not EZ)",
        "Have you tried touching grass?",
        "The pipe did nothing wrong",
        "Maybe try a different bird",
        "Your ancestors would be disappointed",
        "Delete the app. No actually.",
        "Certified PakkiBird moment"
    ];
    private currentMessage = "";

    constructor(private canvas: HTMLCanvasElement, private scoreSystem: ScoreSystem) {}

    generateMessage() {
        this.currentMessage = this.messages[Math.floor(Math.random() * this.messages.length)];
    }

    draw(ctx: CanvasRenderingContext2D) {
        // Dim overlay
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        ctx.fillStyle = 'white';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 4;
        ctx.textAlign = 'center';

        // Score
        ctx.font = 'bold 64px sans-serif';
        ctx.strokeText('Game Over', this.canvas.width / 2, this.canvas.height / 3 - 50);
        ctx.fillText('Game Over', this.canvas.width / 2, this.canvas.height / 3 - 50);

        ctx.font = 'bold 48px sans-serif';
        const scoreTxt = `Score: ${this.scoreSystem.getDisplayScore()}`;
        ctx.strokeText(scoreTxt, this.canvas.width / 2, this.canvas.height / 3 + 20);
        ctx.fillText(scoreTxt, this.canvas.width / 2, this.canvas.height / 3 + 20);

        ctx.font = 'bold 24px sans-serif';
        const bestTxt = `Best: ${this.scoreSystem.getBestScore()}`;
        ctx.strokeText(bestTxt, this.canvas.width / 2, this.canvas.height / 3 + 60);
        ctx.fillText(bestTxt, this.canvas.width / 2, this.canvas.height / 3 + 60);

        // Meme message
        ctx.font = 'italic 20px sans-serif';
        ctx.fillStyle = '#FFD700';
        ctx.fillText(this.currentMessage, this.canvas.width / 2, this.canvas.height / 2 + 20);

        // Instructions
        ctx.fillStyle = 'white';
        const flash = Math.floor(performance.now() / 500) % 2 === 0;
        if (flash) {
            ctx.font = 'bold 24px sans-serif';
            ctx.strokeText('Tap or Space to Retry', this.canvas.width / 2, this.canvas.height / 2 + 100);
            ctx.fillText('Tap or Space to Retry', this.canvas.width / 2, this.canvas.height / 2 + 100);
        }
    }
}