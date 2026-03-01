import { EventBus } from '../core/EventBus';
import { Bird } from '../entities/Bird';
import { PhysicsSystem } from '../systems/PhysicsSystem';
import { ScoreSystem } from '../systems/ScoreSystem';

export class CheatEffects {
    public noclip: boolean = false;
    public timeScale: number = 1;
    public bigBird: boolean = false;

    private slowMoTimer: number = 0;

    constructor(
        private eventBus: EventBus,
        private bird: Bird,
        private physicsSystem: PhysicsSystem,
        private scoreSystem: ScoreSystem
    ) {
        this.eventBus.on('CHEAT_TOGGLED', (id: string) => this.handleCheat(id));
    }

    private handleCheat(id: string) {
        switch (id) {
            case 'NOCLIP':
                this.noclip = !this.noclip;
                this.eventBus.emit('TOAST', `Noclip ${this.noclip ? 'ON' : 'OFF'}`);
                break;
            case 'CHAOS_MODE':
                this.timeScale = this.timeScale === 3 ? 1 : 3;
                this.eventBus.emit('TOAST', `Chaos Mode ${this.timeScale === 3 ? 'ON' : 'OFF'}`);
                break;
            case 'SLOW_MO':
                this.timeScale = 0.5;
                this.eventBus.emit('TOAST', 'Slow Mo ON');
                // Toggle off after 10s
                setTimeout(() => {
                    if (this.timeScale === 0.5) {
                        this.timeScale = 1;
                        this.eventBus.emit('TOAST', 'Slow Mo OFF');
                    }
                }, 10000);
                break;
            case 'BIG_BIRD':
                this.bigBird = !this.bigBird;
                this.eventBus.emit('TOAST', `Big Bird ${this.bigBird ? 'ON' : 'OFF'}`);
                break;
            case 'SCORE_HACK':
                this.scoreSystem.addVisualScore(10);
                this.eventBus.emit('TOAST', 'Score Hack (+10)');
                break;
        }
    }
}