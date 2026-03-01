import { GameLoop } from './core/GameLoop';
import { StateMachine } from './core/StateMachine';
import { Renderer } from './core/Renderer';
import { InputManager } from './input/InputManager';
import { EventBus } from './core/EventBus';
import { Bird } from './entities/Bird';
import { PipeManager } from './entities/PipeManager';
import { Background } from './entities/Background';
import { Ground } from './entities/Ground';
import { PhysicsSystem } from './systems/PhysicsSystem';
import { CollisionSystem } from './systems/CollisionSystem';
import { DifficultySystem } from './systems/DifficultySystem';
import { ScoreSystem } from './systems/ScoreSystem';
import { AudioSystem } from './systems/AudioSystem';
import { CheatEngine } from './cheats/CheatEngine';
import { CheatEffects } from './cheats/CheatEffects';
import { HUD } from './ui/HUD';
import { MenuScreen } from './ui/MenuScreen';
import { GameOverScreen } from './ui/GameOverScreen';
import { CreditsScreen } from './ui/CreditsScreen';
import { ChangelogScreen } from './ui/ChangelogScreen';
import { ToastManager } from './ui/ToastManager';

export class Game {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private loop: GameLoop;
    private stateMachine: StateMachine;
    private eventBus: EventBus;
    
    // Entities
    private bird: Bird;
    private pipeManager: PipeManager;
    private background: Background;
    private ground: Ground;

    // Systems
    private physicsSystem: PhysicsSystem;
    private collisionSystem: CollisionSystem;
    private difficultySystem: DifficultySystem;
    private scoreSystem: ScoreSystem;
    private audioSystem: AudioSystem;

    // Others
    private inputManager: InputManager;
    private renderer: Renderer;
    private cheatEngine: CheatEngine;
    private cheatEffects: CheatEffects;

    // UI
    private hud: HUD;
    private menuScreen: MenuScreen;
    private gameOverScreen: GameOverScreen;
    private creditsScreen: CreditsScreen;
    private changelogScreen: ChangelogScreen;
    private toastManager: ToastManager;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
        this.eventBus = new EventBus();
        
        this.bird = new Bird();
        this.pipeManager = new PipeManager();
        this.background = new Background();
        this.ground = new Ground();

        this.audioSystem = new AudioSystem(this.eventBus);
        this.physicsSystem = new PhysicsSystem(this.bird);
        this.difficultySystem = new DifficultySystem(this.pipeManager);
        this.collisionSystem = new CollisionSystem(this.eventBus, this.bird, this.pipeManager, this.ground, this.canvas);
        this.scoreSystem = new ScoreSystem(this.eventBus, this.bird, this.pipeManager);
        
        this.inputManager = new InputManager(this.eventBus);
        this.renderer = new Renderer(this.ctx, this.canvas);
        this.cheatEngine = new CheatEngine(this.eventBus);
        this.cheatEffects = new CheatEffects(this.eventBus, this.bird, this.physicsSystem, this.scoreSystem);
        
        this.hud = new HUD(this.scoreSystem, this.cheatEffects);
        this.menuScreen = new MenuScreen(this.canvas);
        this.gameOverScreen = new GameOverScreen(this.canvas, this.scoreSystem);
        this.creditsScreen = new CreditsScreen(this.canvas);
        this.changelogScreen = new ChangelogScreen(this.canvas);
        this.toastManager = new ToastManager(this.eventBus);

        this.stateMachine = new StateMachine();
        this.stateMachine.addState('MENU', {
            enter: () => this.background.reset(),
            update: (dt) => this.background.update(dt, 50),
            draw: () => {
                this.renderer.clear();
                this.background.draw(this.ctx, this.canvas);
                this.ground.draw(this.ctx, this.canvas);
                this.menuScreen.draw(this.ctx);
                this.toastManager.draw(this.ctx, this.canvas);
            }
        });
        this.stateMachine.addState('PLAYING', {
            enter: () => {
                this.reset();
            },
            update: (dt) => {
                const scaledDt = dt * this.cheatEffects.timeScale;
                this.physicsSystem.update(scaledDt);
                this.pipeManager.update(scaledDt, this.canvas.width, this.difficultySystem.getSpeed());
                this.background.update(scaledDt, this.difficultySystem.getSpeed() * 0.5);
                this.ground.update(scaledDt, this.difficultySystem.getSpeed());
                
                this.difficultySystem.update(scaledDt, this.scoreSystem.getScore(), this.canvas.width, this.canvas.height);
                this.scoreSystem.update();
                
                if (!this.cheatEffects.noclip) {
                    this.collisionSystem.checkCollisions();
                }
                this.toastManager.update(scaledDt);
            },
            draw: () => {
                this.renderer.clear();
                this.background.draw(this.ctx, this.canvas);
                this.pipeManager.draw(this.ctx, this.canvas);
                this.ground.draw(this.ctx, this.canvas);
                this.bird.draw(this.ctx, this.cheatEffects.bigBird);
                this.hud.draw(this.ctx, this.canvas);
                this.toastManager.draw(this.ctx, this.canvas);
            }
        });
        this.stateMachine.addState('GAMEOVER', {
            enter: () => {
                this.audioSystem.playDeath();
                this.gameOverScreen.generateMessage();
                this.scoreSystem.saveBest();
            },
            update: (dt) => {
                this.toastManager.update(dt);
            },
            draw: () => {
                this.renderer.clear();
                this.background.draw(this.ctx, this.canvas);
                this.pipeManager.draw(this.ctx, this.canvas);
                this.ground.draw(this.ctx, this.canvas);
                this.bird.draw(this.ctx, this.cheatEffects.bigBird);
                this.gameOverScreen.draw(this.ctx);
                this.toastManager.draw(this.ctx, this.canvas);
            }
        });
        this.stateMachine.addState('CREDITS', {
            enter: () => {},
            update: (dt) => this.toastManager.update(dt),
            draw: () => {
                this.renderer.clear();
                this.creditsScreen.draw(this.ctx);
                this.toastManager.draw(this.ctx, this.canvas);
            }
        });
        this.stateMachine.addState('CHANGELOG', {
            enter: () => {},
            update: (dt) => this.toastManager.update(dt),
            draw: () => {
                this.renderer.clear();
                this.changelogScreen.draw(this.ctx);
                this.toastManager.draw(this.ctx, this.canvas);
            }
        });

        this.stateMachine.setState('MENU');

        this.loop = new GameLoop((dt) => {
            this.stateMachine.update(dt);
            this.stateMachine.draw();
        });

        this.setupEvents();
    }

    private setupEvents() {
        this.eventBus.on('INPUT_FLAP', () => {
            if (this.stateMachine.getCurrentState() === 'MENU') {
                this.audioSystem.init();
                this.stateMachine.setState('PLAYING');
                this.physicsSystem.flap();
                this.audioSystem.playFlap();
            } else if (this.stateMachine.getCurrentState() === 'PLAYING') {
                this.physicsSystem.flap();
                this.audioSystem.playFlap();
            } else if (this.stateMachine.getCurrentState() === 'GAMEOVER') {
                this.stateMachine.setState('PLAYING');
            }
        });

        this.eventBus.on('BIRD_DIED', () => {
            this.stateMachine.setState('GAMEOVER');
        });

        this.eventBus.on('SCORE_UP', () => {
            this.audioSystem.playScore();
        });
    }

    private reset() {
        this.bird.reset(this.canvas.width / 3, this.canvas.height / 2);
        this.pipeManager.reset();
        this.scoreSystem.reset();
        this.difficultySystem.reset();
    }

    public start() {
        this.inputManager.attach();
        this.cheatEngine.attach();
        this.loop.start();
    }

    public navigate(hash: string) {
        if (hash === '#credits') {
            this.stateMachine.setState('CREDITS');
        } else if (hash === '#changelog') {
            this.stateMachine.setState('CHANGELOG');
        } else {
            this.stateMachine.setState('MENU');
        }
    }
}