
LevelOneState = function() {
	this.landDogSpawnLocations = [{x:10, y:10}, {x:18, y:8}, {x:27, y:8}, {x:38, y:10},
	{x:43, y:10}, {x: 72, y:5}, {x: 126, y:5}, {x: 142, y:5}, {x: 146, y:5}];

	this.startingCameraPosX = 0;
	this.startingCameraPosY = 0;
	this.spawnPosX = 32;
	this.spawnPosY = 150;

	this.landDogs = new LandDogs(this.landDogSpawnLocations);
	enemies.push(this.landDogs);
	level = new LevelOne(game, this.landDogs);
}

LevelOneState.prototype = Object.create(LevelState.prototype);

LevelOneState.prototype.constructor = LevelOneState;