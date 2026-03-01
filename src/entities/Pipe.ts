export class Pipe {
    public x: number = 0;
    public topHeight: number = 0;
    public bottomY: number = 0;
    public width: number = 52;
    public active: boolean = false;
    public passed: boolean = false;

    init(x: number, topHeight: number, gap: number, _canvasHeight: number) {
        this.x = x;
        this.topHeight = topHeight;
        this.bottomY = topHeight + gap;
        this.active = true;
        this.passed = false;
    }

    draw(ctx: CanvasRenderingContext2D, canvasHeight: number) {
        if (!this.active) return;

        const drawPipe = (x: number, y: number, w: number, h: number, isTop: boolean) => {
            if (h <= 0) return;
            const capHeight = 24;
            const capWidth = w + 8;
            const capX = x - 4;
            
            let capY;
            let bodyY;
            let bodyH;

            if (isTop) {
                capY = y + h - capHeight;
                bodyY = y;
                bodyH = h - capHeight;
            } else {
                capY = y;
                bodyY = y + capHeight;
                bodyH = h - capHeight;
            }

            if (bodyH < 0) {
                bodyH = 0;
            }

            const baseColor = '#73bf2e';
            const shadowColor = '#558022';
            const highlightColor = '#9de858';
            const outlineColor = '#543847';

            ctx.lineWidth = 3;
            ctx.strokeStyle = outlineColor;

            // Draw body
            if (bodyH > 0) {
                ctx.fillStyle = baseColor;
                ctx.fillRect(x, bodyY, w, bodyH);
                ctx.strokeRect(x, bodyY, w, bodyH);

                ctx.fillStyle = highlightColor;
                ctx.fillRect(x + 4, bodyY, 4, bodyH);
                ctx.fillRect(x + 10, bodyY, 12, bodyH);

                ctx.fillStyle = shadowColor;
                ctx.fillRect(x + w - 12, bodyY, 10, bodyH);
            }

            // Draw cap
            ctx.fillStyle = baseColor;
            ctx.fillRect(capX, capY, capWidth, capHeight);
            ctx.strokeRect(capX, capY, capWidth, capHeight);

            ctx.fillStyle = highlightColor;
            ctx.fillRect(capX + 4, capY + 2, 4, capHeight - 4);
            ctx.fillRect(capX + 10, capY + 2, 12, capHeight - 4);

            ctx.fillStyle = shadowColor;
            ctx.fillRect(capX + capWidth - 14, capY + 2, 10, capHeight - 4);
            
            ctx.fillStyle = shadowColor;
            if (isTop) {
                ctx.fillRect(capX + 2, capY + capHeight - 6, capWidth - 4, 4);
            } else {
                ctx.fillRect(capX + 2, capY + capHeight - 6, capWidth - 4, 4);
            }
        };

        // Top pipe
        drawPipe(this.x, 0, this.width, this.topHeight, true);

        // Bottom pipe
        drawPipe(this.x, this.bottomY, this.width, canvasHeight - this.bottomY, false);
    }
}