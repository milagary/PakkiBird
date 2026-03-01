import { Bird } from '../entities/Bird';
import { GameConfig } from '../config/GameConfig';

export class PhysicsSystem {
    constructor(private bird: Bird) {}

    update(dt: number) {
        this.bird.velocity += GameConfig.GRAVITY * dt;
        if (this.bird.velocity > GameConfig.TERMINAL_VELOCITY) {
            this.bird.velocity = GameConfig.TERMINAL_VELOCITY;
        }
        this.bird.y += this.bird.velocity * dt;
    }

    flap() {
        this.bird.velocity = GameConfig.FLAP_IMPULSE;
    }
}