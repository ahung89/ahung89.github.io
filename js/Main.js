var player;
var level;
var hud;
var enemies = [];
var currentState;

var TILE_SIZE = 32;

var game = new Phaser.Game(800, 480, Phaser.AUTO, '');

startLevelOne();

function startLevelOne() {
    // currentState = new LevelOneState();
    currentState = require('./game/states/LevelTwoState');

    // game.state gets the StateManager object for the game (naming is a bit misleading)
    game.state.add('LevelOne', currentState); // Adds the state to the game and assigns it a key.
    game.state.start('LevelOne');
}

function displayFps() {
    console.log('Fps: ' + game.time.fps);
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