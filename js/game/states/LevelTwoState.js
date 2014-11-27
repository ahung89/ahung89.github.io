var LevelState = require('./LevelState');
var Bird = require('../enemies/Birds')
var GunDog = require('../enemies/GunDogs')
var Phoenix = require('../enemies/Phoenixes')
var LevelTwo = require('../levels/LevelTwo')

LevelTwoState = function() {
	// Pro tip: If the parent (LevelState) had properties set in its constructor and I wanted to inherit them, I'd call
	// LevelState.call(this). This would basically just run the function called LevelState. I could also pass in additional args
	// after 'this', if the function took arguments.

	this.birdSpawnLocations = [{x: 4, y:45}];
	this.phoenixSpawnLocations = [{x: 8, y: 41}];
	this.gunDogSpawnLocations = [{x: 15, y:45}];

	this.enemies = [];

	this.startingCameraPosX = 0;
	this.startingCameraPosY = 0;

	this.spawnPosX = 224;
	this.spawnPosY = 1440;

	level = new LevelTwo();
};


LevelTwoState.prototype = Object.create(LevelState.prototype);

LevelTwoState.prototype.preload = function() {
	game.load.spritesheet('phoenix', 'assets/sprites/phoenixsprite.png', 48, 32);
	game.load.image('fireball', 'assets/sprites/fireball.png');
	game.load.spritesheet('bird', 'assets/sprites/bluebirdsprite.png', 48, 32);
	game.load.spritesheet('baddie', 'assets/sprites/baddie.png', 32, 32);

	player = new Player(game, this.spawnPosX, this.spawnPosY);
	player.preload();
	level.preload();
}

LevelTwoState.prototype.create = function() {
	level.create();
	player.create();

	this.createEnemies(Bird, this.birdSpawnLocations);
	this.createEnemies(Phoenix, this.phoenixSpawnLocations);
	this.createEnemies(GunDog, this.gunDogSpawnLocations);
}

LevelTwoState.prototype.createEnemies = function(EnemyType, spawnLocations) {
	spawnLocations.forEach(function(location) {
		this.enemies.push(new EnemyType(location.x * TILE_SIZE, location.y * TILE_SIZE));
	}, this);
}

LevelTwoState.prototype.update = function() {
		player.update();
		level.update();
		
		this.enemies.forEach(function(enemy) {
			enemy.update();
		});
	};

module.exports = LevelTwoState;