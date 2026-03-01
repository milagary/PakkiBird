import { EventBus } from '../core/EventBus';

export class KeyboardHandler {
    constructor(private eventBus: EventBus) {}

    private onKeyDown = (e: KeyboardEvent) => {
        this.eventBus.emit('KEY_DOWN', e.key);
        if (e.code === 'Space') {
            e.preventDefault(); // Prevent scrolling
            this.eventBus.emit('INPUT_FLAP');
        }
    };

    attach() {
        window.addEventListener('keydown', this.onKeyDown);
    }

    detach() {
        window.removeEventListener('keydown', this.onKeyDown);
    }
}