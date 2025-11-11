import LifeDiaryGame, { registerGlobalShortcuts } from './game.js';
import IntroManager from './modules/introManager.js';
import { createAmbientParticles } from './modules/particles.js';

document.addEventListener('DOMContentLoaded', () => {
    createAmbientParticles();

    const game = new LifeDiaryGame();
    window.game = game;

    registerGlobalShortcuts(game);

    const introManager = new IntroManager(game);
    introManager.start();
});
