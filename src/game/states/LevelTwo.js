require('../Common');

var Bird = require('../enemies/Bird');
var GunDog = require('../enemies/GunDog');
var Phoenix = require('../enemies/Phoenix');
var Wolf = require('../enemies/Wolf');

var Level = require('./Level');
var VineLevel = require('./level_types/VineLevel');
var FallingPlatformLevel = require('./level_types/FallingPlatformLevel');

var VINE_TILE_INDICES = [36, 37, 56, 57];

LevelTwo= function() {
	VineLevel.call(this, VINE_TILE_INDICES, 'Foreground', 15, 10);

	this.birdSpawnLocations = [{x:14, y:20, direction: 'right'}, {x:26, y:35, direction: 'left'}, {x:15, y:32, direction: 'right'}, {x:0, y:27, direction: 'right'}];
	this.phoenixSpawnLocations = [{x: 47, y: 11, direction: 'right'}, {x: 56, y: 11, direction: 'left'}];
	this.gunDogSpawnLocations = [{x: 29, y: 44, direction: 'left'}, {x: 15, y: 39, direction: 'right'}, {x: 25, y: 37, direction: 'left'}, {x: 13, y: 34, direction: 'right'}];
	this.wolfSpawnLocations = [{x: 23, y: 46, direction: 'left'}, {x: 10, y: 48, direction: 'left'}, {x: 25, y: 21, direction: 'left'}, {x: 29, y: 19, direction: 'left'}];

	this.fallingPlatformLocations = [];
	this.movingPlatforms = [];

	this.emptySpaceTiles = [1];

	FallingPlatformLevel.call(this, this.fallingPlatformLocations);

	this.startingCameraPosX = 0;
	this.startingCameraPosY = 0;

	this.spawnPosX = 4  * TILE_SIZE;
	this.spawnPosY = 45 * TILE_SIZE;
};


LevelTwo.prototype = {
	create: function() {
		this.initLevel('levelTwo', 'area01_level_tiles', 'levelTwoTiles');

		bg = game.add.tileSprite(0, 0, 1366, 768, 'space');
		bg.fixedToCamera = true;

		this.createLayers();
		this.createEnemies();
		this.setTileCollisions();
		this.buildLevelComponents();

		player.create();
	},

	createLayers: function() {
		this.layer = this.map.createLayer('World');
		this.foreground = this.map.createLayer('Foreground');

		this.layer.resizeWorld();
		this.foreground.resizeWorld();
	},

	createEnemies: function() {
		this.spawnEnemies(Bird, this.birdSpawnLocations);
		this.spawnEnemies(Phoenix, this.phoenixSpawnLocations);
		this.spawnEnemies(GunDog, this.gunDogSpawnLocations);
		this.spawnEnemies(Wolf, this.wolfSpawnLocations);
	},

	spawnEnemies: function(EnemyType, spawnSettings) {
		spawnSettings.forEach(function(settings) {
			this.enemies.push(new EnemyType(settings.x * TILE_SIZE, settings.y * TILE_SIZE, settings.direction));
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
		this.map.setCollision(75);
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