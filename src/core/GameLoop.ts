export class GameLoop {
    private lastTime: number = 0;
    private rafId: number = 0;
    private tick: (dt: number) => void;

    constructor(tick: (dt: number) => void) {
        this.tick = tick;
    }

    public start() {
        this.lastTime = performance.now();
        this.rafId = requestAnimationFrame(this.loop.bind(this));
    }

    public stop() {
        cancelAnimationFrame(this.rafId);
    }

    private loop(time: number) {
        const dt = (time - this.lastTime) / 1000;
        this.lastTime = time;
        // Cap dt to prevent spiraling
        this.tick(Math.min(dt, 0.1));
        this.rafId = requestAnimationFrame(this.loop.bind(this));
    }
}