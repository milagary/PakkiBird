import { DifficultyConfig } from '../config/DifficultyConfig';
import { PipeManager } from '../entities/PipeManager';

export class DifficultySystem {
    private currentSpeed: number;
    private currentGap: number;
    private currentSpawnRate: number;
    private spawnTimer: number = 0;

    constructor(private pipeManager: PipeManager) {
        this.currentSpeed = DifficultyConfig.BASE_SPEED;
        this.currentGap = DifficultyConfig.BASE_GAP;
        this.currentSpawnRate = DifficultyConfig.BASE_SPAWN;
    }

    reset() {
        this.currentSpeed = DifficultyConfig.BASE_SPEED;
        this.currentGap = DifficultyConfig.BASE_GAP;
        this.currentSpawnRate = DifficultyConfig.BASE_SPAWN;
        this.spawnTimer = 0;
    }

    update(dt: number, score: number, canvasWidth: number, canvasHeight: number) {
        this.currentSpeed = Math.min(DifficultyConfig.MAX_SPEED, DifficultyConfig.BASE_SPEED + (score * 0.4));
        this.currentGap = Math.max(DifficultyConfig.MIN_GAP, DifficultyConfig.BASE_GAP - (score * 1.2));
        this.currentSpawnRate = Math.max(DifficultyConfig.MIN_SPAWN, DifficultyConfig.BASE_SPAWN - (score * 0.015));

        this.spawnTimer += dt;
        if (this.spawnTimer >= this.currentSpawnRate) {
            this.spawnTimer = 0;
            this.pipeManager.spawnPipe(canvasWidth, canvasHeight, this.currentGap);
        }
    }

    getSpeed() {
        return this.currentSpeed;
    }
}