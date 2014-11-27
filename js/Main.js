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
    // currentState = new LevelOneState();
    currentState = require('./game/states/LevelOneState');

    // game.state gets the StateManager object for the game (naming is a bit misleading)
    game.state.add('LevelOne', currentState); // Adds the state to the game and assigns it a key.
    game.state.start('LevelOne');
}

function restartGame() {
    // TODO
}

function restartCurrentLevel() {
    currentState.restart();
}

//Reset camera to initial position
function resetCamera(xPos, yPos) {
    game.camera.x = xPos;
    game.camera.y = yPos;
}