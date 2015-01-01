// Globals
window.player;
window.level;
window.currentState;
window.TILE_SIZE = 32;
window.game = new Phaser.Game(800, 480, Phaser.CANVAS, '');
window.$ = require('jquery');

startGame();

function startGame() {
    // game.state gets the StateManager object for the game (naming is a bit misleading)
    game.state.add('Boot', require('./game/states/Boot')); 
    game.state.add('Preloader', require('./game/states/Preloader')); 
    game.state.add('Menu', require('./game/states/Menu'));
    game.state.add('LevelSelect', require('./game/states/LevelSelect'));
    game.state.add('LevelOne', require('./game/states/LevelOne')); // Adds the state to the game and assigns it a key.
    game.state.add('LevelTwo', require('./game/states/LevelTwo'));
    game.state.add('Victory', require('./game/states/Victory')); 

    game.state.start('Boot');
}
