interface State {
    enter: () => void;
    update: (dt: number) => void;
    draw: () => void;
}

export class StateMachine {
    private states: Map<string, State> = new Map();
    private currentState: string | null = null;

    addState(name: string, state: State) {
        this.states.set(name, state);
    }

    setState(name: string) {
        if (this.states.has(name)) {
            this.currentState = name;
            this.states.get(name)!.enter();
        }
    }

    getCurrentState() {
        return this.currentState;
    }

    update(dt: number) {
        if (this.currentState) {
            this.states.get(this.currentState)!.update(dt);
        }
    }

    draw() {
        if (this.currentState) {
            this.states.get(this.currentState)!.draw();
        }
    }
}