require('../Common');

var Wolf = require('../enemies/Wolf');
var Bird = require('../enemies/Bird');
var Phoenix = require('../enemies/Phoenix');
var Squirrel = require('../enemies/Squirrel');

var Level = require('./Level');
var PlatformLevel = require('./level_types/PlatformLevel');

var PADDLE_SPEED = 130;
var SQUIRREL_SPAWN_RATE = 1300;

LevelOne = function() {
	this.wolfSpawnSettings = [
		{x: 18, y: 10, direction: 'right'},
		{x: 30, y: 8, direction: 'left'},
		{x: 44, y: 11, direction: 'left'},
		{x: 142, y: 6, direction: 'left'}
	];	

	this.phoenixSpawnSettings = [
		{x: 48, y: 0, direction: 'left', patrolBounds: {min: 48 * TILE_SIZE, max: 58 * TILE_SIZE}},
		{x: 39, y: 2, direction: 'left', patrolBounds: {min: 39 * TILE_SIZE, max: 48 * TILE_SIZE}},
		{x: 78, y: 2, direction: 'right', patrolBounds: {min: 78 * TILE_SIZE, max: 100 * TILE_SIZE}},
		{x: 135, y: 2, direction: 'right', patrolBounds: {min: 135 * TILE_SIZE, max: 149 * TILE_SIZE}}
	];

	this.birdSpawnSettings = [
		{x: 71, y: 10, direction: 'right', patrolBounds: {min: 70 * TILE_SIZE, max: 79 * TILE_SIZE}}];

	this.movingPlatformSettings = [
		{x: 78, y: 9, territorySize:6, speed:PADDLE_SPEED, initialDirection:'right'},
		{x: 96, y: 9, territorySize:6, speed:PADDLE_SPEED, initialDirection:'left'}
	];

	this.squirrelHoleSettings = [
		{x: 122, y: 7, direction: 'left', nextSquirrelSpawnTime: 0},
		{x: 124, y: 10, direction: 'right', nextSquirrelSpawnTime: 1000},
		{x: 181, y: 5, direction: 'left', nextSquirrelSpawnTime: 2000}
	];

	this.startingCameraPosX = 0;
	this.startingCameraPosY = 0;
	this.spawnPosX = 150;
	this.spawnPosY = 300;

	// this.spawnPosX = 320;
	// this.spawnPosY = 300;

	// this.spawnPosX = 177 * TILE_SIZE;
	// this.spawnPosY = 5 * TILE_SIZE;


	// this.spawnPosX = 106 * TILE_SIZE;
	// this.spawnPosY = 6 * TILE_SIZE;

	this.map = null;
    this.layer = null;
    this.movingPlatforms = [];

    this.forest = null;
    this.fog = null;

    this.emptySpaceTiles = [1];
}

LevelOne.prototype = {
	create: function() {
		// No real reason to use tilesprite instead of static image... doing it just for the hell of it.
		this.forest = game.add.tileSprite(0, 0, game.camera.width, game.camera.height, 'forest');
		this.forest.fixedToCamera = true;

		this.initLevel('levelOne', 'area02_level_tiles', 'levelOneTiles');

		this.setTileCollisions();
		this.createLayers();

		this.enemyGroup = game.add.group();
		this.createEnemies();
		this.createPlatforms();
		this.createVictoryFlag(184 * TILE_SIZE, 4 * TILE_SIZE - 54);

		this.cursors = game.input.keyboard.createCursorKeys(); // make this global?

		player.create();

		this.playMusic();

		this.fadeIn(function() {
			this.displayLevelTitle('level_one_title')
		}, this);
	},

	createLayers: function() {
		this.background = this.map.createLayer('Background');
		this.layer = this.map.createLayer('World');

		this.background.resizeWorld();
		this.layer.resizeWorld();
	},

	createEnemies: function() {
		Wolf.spawn(this.wolfSpawnSettings, this.enemyGroup);
		Phoenix.spawn(this.phoenixSpawnSettings, this.enemyGroup);
		Bird.spawn(this.birdSpawnSettings, this.enemyGroup);
	},

	setTileCollisions: function() {
		this.map.setCollisionBetween(2, 19);
		this.map.setCollisionBetween(21, 79);
		this.map.setCollisionBetween(81, 85);
		this.map.setCollisionBetween(87, 97);
		this.map.setCollisionBetween(101, 117);
	},

	update: function() {
		player.update();

		if(player.deathInitiated) {
			return;
		}
		
		game.physics.arcade.collide(player.sprite, this.movingPlatforms);

		this.movePlatforms();

		this.enemyGroup.forEach(function(enemy) {
			try {
				game.physics.arcade.collide(enemy, this.movingPlatforms);
				enemy.parentEntity.update();
			} catch (e) {
				// If game is still in update loop when restarting due to death.
			}
			
		});

		this.squirrelHoleSettings.forEach(function(settings) {
			if(game.time.now >= settings.nextSquirrelSpawnTime) {
				this.spawnSquirrelAtSquirrelHole(settings);
				settings.nextSquirrelSpawnTime = game.time.now + SQUIRREL_SPAWN_RATE;
			}
		}, this);

		if(player.deathInitiated) {
			this.freezeSpritesAndProjectiles();
		}
	},

	tearDownLevelComponents: function() {
		this.movingPlatforms.destroy();
	},

	buildLevelComponents: function() {
		this.createPlatforms();
	},

	spawnSquirrelAtSquirrelHole: function(settings) {
		var squirrel = new Squirrel(settings.x * TILE_SIZE, settings.y * TILE_SIZE, settings.direction);
		squirrel.sprite.checkWorldBounds = true;
		squirrel.sprite.outOfBoundsKill = true;
		this.enemyGroup.add(squirrel.sprite);
	}
};

module.exports = LevelOne;

$.extend(LevelOne.prototype, Level.prototype);
$.extend(LevelOne.prototype, PlatformLevel.prototype);