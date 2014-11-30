require('../../Common');

var Bird = require('../../enemies/Bird');
var GunDog = require('../../enemies/GunDog');
var Phoenix = require('../../enemies/Phoenix');

var Level = require('./Level');
var VineLevel = require('./VineLevel');
var FallingPlatformLevel = require('./FallingPlatformLevel');

var VINE_TILE_INDICES = [36, 37, 56, 57];

LevelTwo= function() {
	VineLevel.call(this, VINE_TILE_INDICES, 'Foreground', 15, 10);

	this.birdSpawnLocations = [{x: 4, y:45}];
	this.phoenixSpawnLocations = [{x: 8, y: 41}];
	this.gunDogSpawnLocations = [{x: 15, y:45}];

	this.fallingPlatformLocations = [{x: 3, y:45}];

	FallingPlatformLevel.call(this, this.fallingPlatformLocations);

	this.startingCameraPosX = 0;
	this.startingCameraPosY = 0;

	this.spawnPosX = 224;
	this.spawnPosY = 1440;
};


LevelTwo.prototype = {
	create: function() {
		player.create();

		this.initLevel('levelTwo', 'area01_level_tiles', 'levelTwoTiles');
		this.createLayers();
		this.createEnemies();
	},

	createLayers: function() {
		this.layer = this.map.createLayer('World');
		this.foreground = this.map.createLayer('Foreground');

		this.layer.resizeWorld();
		this.foreground.resizeWorld();
	},

	createEnemies: function() {
		// this.spawnEnemies(Bird, this.birdSpawnLocations);
		// this.spawnEnemies(Phoenix, this.phoenixSpawnLocations);
		// this.spawnEnemies(GunDog, this.gunDogSpawnLocations);
	},

	spawnEnemies: function(EnemyType, spawnLocations) {
		spawnLocations.forEach(function(location) {
			this.enemies.push(new EnemyType(location.x * TILE_SIZE, location.y * TILE_SIZE));
		}, this);
	},

	update: function() {
		player.update();
		
		this.enemies.forEach(function(enemy) {
			enemy.update();
		});

		this.checkFallingPlatformCollisions();
	},

	setTileCollisions: function() {
		this.map.setCollisionBetween(2, 8);
		this.map.setCollisionBetween(24, 27);
		this.map.setCollisionBetween(41, 45);
		this.map.setCollisionBetween(51, 53);
		this.map.setCollisionBetween(61, 62);
		this.map.setCollisionBetween(70, 72);
		this.map.setCollisionBetween(112, 114);
		this.map.setCollisionBetween(121, 125);

		// Spikes
		this.map.setTileIndexCallback(92, player.killPlayer, player);

		this.setVineCollisions();
	},

	tearDownLevelComponents: function() {
		this.fallingPlatforms.destroy();
	},

	buildLevelComponents: function() {
		this.createPlatforms();
	}
}

$.extend(LevelTwo.prototype, Level.prototype);
$.extend(LevelTwo.prototype, VineLevel.prototype);
$.extend(LevelTwo.prototype, FallingPlatformLevel.prototype);

module.exports = LevelTwo;