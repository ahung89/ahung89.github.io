// Globals
window.player;
window.level;
window.enemies = [];
window.currentState;
window.TILE_SIZE = 32;
window.game = new Phaser.Game(800, 480, Phaser.AUTO, '');
window.$ = require('jquery');

startLevelOne();

function startLevelOne() {
    // currentState = require('./game/states/LevelOne');

    // game.state gets the StateManager object for the game (naming is a bit misleading)
    game.state.add('Boot', require('./game/states/Boot')); 
    game.state.add('Preloader', require('./game/states/Preloader')); 
    game.state.add('LevelOne', require('./game/states/LevelOne')); // Adds the state to the game and assigns it a key.
    game.state.add('LevelTwo', require('./game/states/Leveltwo')); 

    game.state.start('Boot');
}

function restartGame() {
    // TODO
}

function restartCurrentLevel() {
    // currentState.restart();
}

//Reset camera to initial position
function resetCamera(xPos, yPos) {
    game.camera.x = xPos;
    game.camera.y = yPos;
}