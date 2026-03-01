import { EventBus } from '../core/EventBus';

export class TouchHandler {
    constructor(private eventBus: EventBus) {}

    private onTouchStart = (_e: TouchEvent) => {
        this.eventBus.emit('INPUT_FLAP');
    };
    
    private onMouseDown = (e: MouseEvent) => {
        if ((e.target as HTMLElement).tagName.toUpperCase() === 'CANVAS') {
            this.eventBus.emit('INPUT_FLAP');
        }
    };

    attach() {
        window.addEventListener('touchstart', this.onTouchStart, { passive: false });
        window.addEventListener('mousedown', this.onMouseDown);
    }

    detach() {
        window.removeEventListener('touchstart', this.onTouchStart);
        window.removeEventListener('mousedown', this.onMouseDown);
    }
}