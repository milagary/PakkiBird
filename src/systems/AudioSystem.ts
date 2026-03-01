import { EventBus } from '../core/EventBus';

export class AudioSystem {
    private ctx: AudioContext | null = null;
    private initialized = false;

    constructor(_eventBus: EventBus) {}

    init() {
        if (!this.initialized) {
            this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
            if (this.ctx.state === 'suspended') {
                this.ctx.resume();
            }
            this.initialized = true;
        }
    }

    private playTone(freqStart: number, freqEnd: number, type: OscillatorType, duration: number) {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        
        osc.type = type;
        osc.frequency.setValueAtTime(freqStart, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(freqEnd, this.ctx.currentTime + duration);
        
        gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + duration);
        
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        
        osc.start();
        osc.stop(this.ctx.currentTime + duration);
    }

    playFlap() {
        this.playTone(300, 600, 'sine', 0.08);
    }

    playScore() {
        this.playTone(800, 1200, 'square', 0.1);
    }

    playDeath() {
        this.playTone(300, 50, 'sawtooth', 0.4);
    }

    playClick() {
        this.playTone(600, 600, 'sine', 0.06);
    }
}