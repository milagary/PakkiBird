import { Bird } from '../entities/Bird';
import { PipeManager } from '../entities/PipeManager';
import { EventBus } from '../core/EventBus';
import { StorageUtils } from '../utils/StorageUtils';

export class ScoreSystem {
    private score: number = 0;
    private bestScore: number = 0;
    private visualScoreHack: number = 0;

    constructor(
        private eventBus: EventBus,
        private bird: Bird,
        private pipeManager: PipeManager
    ) {
        this.bestScore = StorageUtils.getNumber('pakkibird_highscore', 0);
    }

    reset() {
        this.score = 0;
        this.visualScoreHack = 0;
    }

    addVisualScore(amount: number) {
        this.visualScoreHack += amount;
    }

    update() {
        const pipes = this.pipeManager.getPipes();
        for (const pipe of pipes) {
            if (!pipe.passed && this.bird.x > pipe.x + pipe.width) {
                pipe.passed = true;
                this.score++;
                this.eventBus.emit('SCORE_UP');
            }
        }
    }

    getScore() {
        return this.score;
    }

    getDisplayScore() {
        return this.score + this.visualScoreHack;
    }

    getBestScore() {
        return this.bestScore;
    }

    saveBest() {
        if (this.score > this.bestScore) {
            this.bestScore = this.score;
            StorageUtils.setNumber('pakkibird_highscore', this.bestScore);
        }
    }
}