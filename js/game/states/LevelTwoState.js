var LevelState = require('./LevelState');
var Birds = require('../enemies/Birds')
var GunDogs = require('../enemies/GunDogs')
var Phoenixes = require('../enemies/Phoenixes')

LevelTwoState = function() {
	// Pro tip: If the parent (LevelState) had properties set in its constructor and I wanted to inherit them, I'd call
	// LevelState.call(this). This would basically just run the function called LevelState. I could also pass in additional args
	// after 'this', if the function took arguments.

	this.birdSpawnLocations = [{x: 3, y:45}];
	this.phoenixSpawnLocations = [{x: 8, y: 41}];
	this.gunDogSpawnLocations = [{x: 15, y:45}];

	this.startingCameraPosX = 0;
	this.startingCameraPosY = 0;

	this.spawnPosX = 224;
	this.spawnPosY = 1440;

	this.birds = new Birds(this.birdSpawnLocations);
	this.gunDogs = new GunDogs(this.gunDogSpawnLocations);
	this.phoenixes = new Phoenixes(this.phoenixSpawnLocations);

	enemies.push(this.birds);
	enemies.push(this.gunDogs);
	enemies.push(this.phoenixes);

	level = new LevelTwo(game, this.birds, this.gunDogs, this.phoenixes);
};

LevelTwoState.prototype = Object.create(LevelState.prototype);

module.exports = LevelTwoState;