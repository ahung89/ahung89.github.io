require('../Common');

var Bird = require('../enemies/Bird');
var GunShip = require('../enemies/GunShip');
var Phoenix = require('../enemies/Phoenix');
var Wolf = require('../enemies/Wolf');
var Climber = require('../enemies/Climber');

var Level = require('./Level');
var VineLevel = require('./level_types/VineLevel');
var FallingPlatformLevel = require('./level_types/FallingPlatformLevel');

var VINE_TILE_INDICES = [36, 37, 56, 57];

LevelTwo = function() {
	VineLevel.call(this, VINE_TILE_INDICES, 'Foreground', 15, 10);

	this.birdSpawnSettings = [{x:26, y:35, direction: 'left'}, {x:15, y:32, direction: 'right'}, {x:0, y:27, direction: 'right'}, 
		{x:44, y:27, direction: 'right'}, {x:47, y:31, direction: 'right'}];
	this.phoenixSpawnSettings = [{x: 47, y: 11, direction: 'right', patrolBounds: {min: 45 * TILE_SIZE, max: 58 * TILE_SIZE}}, 
	{x: 56, y: 11, direction: 'left', patrolBounds: {min: 45 * TILE_SIZE, max: 58 * TILE_SIZE}}, {x: 56, y: 37, direction: 'right'},
		{x: 63, y: 35, direction: 'right', initialDelay: 1000}, {x: 71, y: 36, direction: 'left', initialDelay: 3000},
		{x: 70, y: 38, direction: 'left', initialDelay: 4500}, {x:54, y:23, direction: 'left'}];
	this.gunShipSpawnSettings = [{x: 29, y: 45, direction: 'left'}, {x: 15, y: 39, direction: 'right'}, {x: 25, y: 37, direction: 'left'}, {x: 13, y: 34, direction: 'right'},
		{x: 43, y: 34, direction: 'right'}, {x: 38, y: 46, direction: 'right'}];
	this.wolfSpawnSettings = [{x: 23, y: 46, direction: 'left'}, {x: 10, y: 48, direction: 'left'}, {x: 25, y: 21, direction: 'left'}, {x: 29, y: 19, direction: 'left'},
	 	{x: 57, y: 29, direction: 'left'}, {x: 61, y: 44, direction: 'right'}, {x: 64, y: 44, direction: 'right'}, {x: 70, y: 44, direction: 'right'},
		{x: 81, y: 36, direction: 'right'}];
	this.climberSpawnSettings = [{x: 75, y: 30, direction: 'down', patrolBounds: {min: 12 * TILE_SIZE, max: 31 * TILE_SIZE}}, 
		{x: 75, y: 15, direction: 'down', patrolBounds: {min: 12 * TILE_SIZE, max: 31 * TILE_SIZE}},
		{x: 81, y: 27, direction: 'down', patrolBounds: {min: 12 * TILE_SIZE, max: 31 * TILE_SIZE}},
		{x: 81, y: 22, direction: 'down', patrolBounds: {min: 12 * TILE_SIZE, max: 31 * TILE_SIZE}},
		{x: 81, y: 17, direction: 'down', patrolBounds: {min: 12 * TILE_SIZE, max: 31 * TILE_SIZE}},
		{x: 81, y: 12, direction: 'down', patrolBounds: {min: 12 * TILE_SIZE, max: 31 * TILE_SIZE}},
		{x: 87, y: 14, direction: 'down', patrolBounds: {min: 12 * TILE_SIZE, max: 17 * TILE_SIZE}}];

	this.checkpointSettings = [
		{x: 44 * TILE_SIZE, y: 17 * TILE_SIZE}
	];

	this.fallingPlatformLocations = [{x: 82, y: 43}, {x: 89, y: 40}];
	this.movingPlatforms = [];
	this.emptySpaceTiles = [1];

	FallingPlatformLevel.call(this, this.fallingPlatformLocations);

	this.startingCameraPosX = 0;
	this.startingCameraPosY = 0;

	// The beginning
	this.spawnPosX = 4  * TILE_SIZE;
	this.spawnPosY = 45 * TILE_SIZE;

	// Right before the two phoenixes
	// this.spawnPosX = 43  * TILE_SIZE;
	// this.spawnPosY = 16 * TILE_SIZE;

	// 	this.spawnPosX = 43  * TILE_SIZE;
	// this.spawnPosY = 27 * TILE_SIZE;

	// Right before the 4 phoenixes
	// this.spawnPosX = 47  * TILE_SIZE;
	// this.spawnPosY = 40 * TILE_SIZE;

	// this.spawnPosX = 75  * TILE_SIZE;
	// this.spawnPosY = 42 * TILE_SIZE;

	//Final section
	// this.spawnPosX = 76 * TILE_SIZE;
	// this.spawnPosY = 32 * TILE_SIZE;

	// this.spawnPosX = 17  * TILE_SIZE;
	// this.spawnPosY = 27 * TILE_SIZE;
};


LevelTwo.prototype = {
	create: function() {
		this.playMusic();

		this.initLevel('levelTwo', 'area01_level_tiles', 'levelTwoTiles');

		bg = game.add.tileSprite(0, 0, 1366, 768, 'space');
		bg.fixedToCamera = true;

		this.createLayers();

		// Must be after createLayers since by default z-index is determined by order that entities are added to game.world.
		// To make enemies not be displayed behind background elements like signs, they must have a higher z-index than the layers.
		this.enemyGroup = game.add.group();
		this.checkpoints = game.add.group();

		this.createEnemies();
		this.setTileCollisions();
		this.buildLevelComponents();

		this.createVictoryFlag(96 * TILE_SIZE, 14 * TILE_SIZE - 54);
		this.createCheckpoints(this.checkpointSettings);

		player.create();

		this.fadeIn(function() {
			this.displayLevelTitle('level_two_title')
		}, this);
	},

	createLayers: function() {
		this.layer = this.map.createLayer('World');
		this.foreground = this.map.createLayer('Foreground');

		this.layer.resizeWorld();
		this.foreground.resizeWorld();
	},

	createEnemies: function() {
		Bird.spawn(this.birdSpawnSettings, this.enemyGroup);
		Wolf.spawn(this.wolfSpawnSettings, this.enemyGroup);
		Phoenix.spawn(this.phoenixSpawnSettings, this.enemyGroup);
		GunShip.spawn(this.gunShipSpawnSettings, this.enemyGroup);
		Climber.spawn(this.climberSpawnSettings, this.enemyGroup);
	},

	update: function() {
		player.update();
		
		if(player.deathInitiated) {
			return;
		}

		this.enemyGroup.forEach(function(enemy) {
			try {
				enemy.parentEntity.update();
			} catch (e) {
				// Safe restarting.
			}
			
		}, this);

		this.checkFallingPlatformCollisions();

		if(player.deathInitiated) {
			this.freezeSpritesAndProjectiles();
		}
	},

	setTileCollisions: function() {
		this.map.setCollisionBetween(2, 8);
		this.map.setCollisionBetween(24, 27);
		this.map.setCollisionBetween(41, 45);
		this.map.setCollisionBetween(51, 53);
		this.map.setCollisionBetween(61, 62);
		this.map.setCollisionBetween(70, 72);
		this.map.setCollision(75);
		this.map.setCollision(92);
		this.map.setCollisionBetween(112, 114);
		this.map.setCollisionBetween(121, 125);

		// Spikes
		this.map.setTileIndexCallback(92, this.handleSpikeCollision, player);

		this.setVineCollisions();
	},

	// This callback function will be called in the physics arcade system's separateTile method, which automatically 
	// passes the colliding sprite body and the tile as arg1 and arg2.
	handleSpikeCollision: function(sprite, tile) {
		if(sprite === player.sprite) {
			player.initiateDeath();
		}

		return true;  // Return something so that collision handling physics will be applied after this callback.
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