import { EventBus } from '../core/EventBus';
import { KeyboardHandler } from './KeyboardHandler';
import { TouchHandler } from './TouchHandler';

export class InputManager {
    private keyboard: KeyboardHandler;
    private touch: TouchHandler;

    constructor(eventBus: EventBus) {
        this.keyboard = new KeyboardHandler(eventBus);
        this.touch = new TouchHandler(eventBus);
    }

    attach() {
        this.keyboard.attach();
        this.touch.attach();
    }

    detach() {
        this.keyboard.detach();
        this.touch.detach();
    }
}