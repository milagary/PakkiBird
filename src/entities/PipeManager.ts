import { Pipe } from './Pipe';
import { MathUtils } from '../utils/MathUtils';

export class PipeManager {
    private pipes: Pipe[] = [];

    constructor() {
        for (let i = 0; i < 10; i++) {
            this.pipes.push(new Pipe());
        }
    }

    reset() {
        this.pipes.forEach(p => p.active = false);
    }

    getPipes() {
        return this.pipes.filter(p => p.active);
    }

    update(dt: number, canvasWidth: number, speed: number) {
        this.pipes.forEach(pipe => {
            if (pipe.active) {
                pipe.x -= speed * dt;
                if (pipe.x + pipe.width < 0) {
                    pipe.active = false;
                }
            }
        });
    }
    
    spawnPipe(canvasWidth: number, canvasHeight: number, gap: number) {
        const pipe = this.pipes.find(p => !p.active);
        if (pipe) {
            const minHeight = 50;
            const maxTopHeight = canvasHeight - gap - minHeight - 100; // 100 for ground
            const topHeight = MathUtils.random(minHeight, maxTopHeight);
            pipe.init(canvasWidth, topHeight, gap, canvasHeight);
        }
    }
}