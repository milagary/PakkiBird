import { Game } from './Game';

window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
    if (!canvas) throw new Error('Could not find canvas element');
    
    // Resize logic
    const resize = () => {
        const container = document.getElementById('game-container');
        if (container) {
            canvas.width = container.clientWidth;
            canvas.height = container.clientHeight;
        }
    };
    window.addEventListener('resize', resize);
    resize();

    const game = new Game(canvas);
    game.start();

    // Hash Routing
    const handleHashChange = () => {
        const hash = window.location.hash;
        game.navigate(hash);
    };
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
});