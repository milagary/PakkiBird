import { Bird } from '../entities/Bird';
import { PipeManager } from '../entities/PipeManager';
import { Ground } from '../entities/Ground';
import { EventBus } from '../core/EventBus';

export class CollisionSystem {
    constructor(
        private eventBus: EventBus,
        private bird: Bird,
        private pipeManager: PipeManager,
        private ground: Ground,
        private canvas: HTMLCanvasElement
    ) {}

    checkCollisions() {
        // Ground and ceiling collision
        if (this.bird.y + this.bird.radius > this.canvas.height - this.ground.getHeight()) {
            this.eventBus.emit('BIRD_DIED');
            return;
        }
        if (this.bird.y - this.bird.radius < 0) {
            this.eventBus.emit('BIRD_DIED');
            return;
        }

        // Pipe collision
        const hitboxShrink = 0.78;
        const radius = this.bird.radius * hitboxShrink;
        
        for (const pipe of this.pipeManager.getPipes()) {
            // Check top pipe
            if (this.intersects(
                this.bird.x, this.bird.y, radius,
                pipe.x, 0, pipe.width, pipe.topHeight
            )) {
                this.eventBus.emit('BIRD_DIED');
                return;
            }

            // Check bottom pipe
            if (this.intersects(
                this.bird.x, this.bird.y, radius,
                pipe.x, pipe.bottomY, pipe.width, this.canvas.height - pipe.bottomY
            )) {
                this.eventBus.emit('BIRD_DIED');
                return;
            }
        }
    }

    private intersects(bx: number, by: number, br: number, px: number, py: number, pw: number, ph: number): boolean {
        const testX = Math.max(px, Math.min(bx, px + pw));
        const testY = Math.max(py, Math.min(by, py + ph));
        
        const distX = bx - testX;
        const distY = by - testY;
        const distance = Math.sqrt((distX * distX) + (distY * distY));
        
        return distance <= br;
    }
}