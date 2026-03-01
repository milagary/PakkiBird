import { EventBus } from '../core/EventBus';
import { CheatConfig } from '../config/CheatConfig';
import { StorageUtils } from '../utils/StorageUtils';

export class CheatEngine {
    private keyBuffer: string[] = [];
    private unlockedCheats: Set<string>;

    constructor(private eventBus: EventBus) {
        this.unlockedCheats = new Set(StorageUtils.getArray('pakkibird_cheats_unlocked'));
    }

    attach() {
        this.eventBus.on('KEY_DOWN', (key: string) => this.onKey(key));
    }

    private onKey(key: string) {
        this.keyBuffer.push(key);
        if (this.keyBuffer.length > 12) {
            this.keyBuffer.shift();
        }

        for (const [id, sequence] of Object.entries(CheatConfig)) {
            if (this.checkSequence(sequence)) {
                this.activateCheat(id);
                this.keyBuffer = []; // Reset buffer
                break;
            }
        }
    }

    private checkSequence(sequence: string[]): boolean {
        if (this.keyBuffer.length < sequence.length) return false;
        
        const recentKeys = this.keyBuffer.slice(-sequence.length);
        return sequence.every((key, index) => key.toLowerCase() === recentKeys[index].toLowerCase());
    }

    private activateCheat(id: string) {
        this.eventBus.emit('CHEAT_TOGGLED', id);
        if (!this.unlockedCheats.has(id)) {
            this.unlockedCheats.add(id);
            StorageUtils.setArray('pakkibird_cheats_unlocked', Array.from(this.unlockedCheats));
        }
    }
}