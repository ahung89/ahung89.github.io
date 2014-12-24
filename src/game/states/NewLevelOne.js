require('../Common');

var Wolf = require('../enemies/Wolf');
var Bird = require('../enemies/Bird');
var Phoenix = require('../enemies/Phoenix');
var Level = require('./Level');

NewLevelOne = function() {
	this.wolfSpawnSettings = [
		{x: 18, y: 10, direction: 'right'},
		{x: 30, y: 8, direction: 'left'},
		{x: 44, y: 11, direction: 'left'}
	];	

	this.phoenixSpawnSettings = [
		{x: 48, y: 0, direction: 'left', patrolBounds: {min: 48 * TILE_SIZE, max: 58 * TILE_SIZE}},
		{x: 39, y: 2, direction: 'left', patrolBounds: {min: 39 * TILE_SIZE, max: 48 * TILE_SIZE}}
	];

	this.birdSpawnSettings = [
		{x: 71, y: 10, direction: 'right', patrolBounds: {min: 70 * TILE_SIZE, max: 79 * TILE_SIZE}}];

	this.startingCameraPosX = 0;
	this.startingCameraPosY = 0;
	this.spawnPosX = 32;
	this.spawnPosY = 300;

	this.map = null;
    this.layer = null;
    this.movingPlatforms = [];

    this.forest = null;
    this.fog = null;

    this.emptySpaceTiles = [1];
}

NewLevelOne.prototype = {
	create: function() {
		this.forest = game.add.tileSprite(0, 0, game.camera.width, game.camera.height, 'forest');
		this.forest.fixedToCamera = true;

		this.initLevel('newLevelOne', 'area02_level_tiles', 'newLevelOneTiles');

		this.setTileCollisions();
		this.createLayers();
		this.createEnemies();

		this.cursors = game.input.keyboard.createCursorKeys(); // make this global?

		player.create();
	},

	createLayers: function() {
		this.background = this.map.createLayer('Background');
		this.layer = this.map.createLayer('World');

		this.background.resizeWorld();
		this.layer.resizeWorld();
	},

	createEnemies: function() {
		this.enemies.push.apply(this.enemies, Wolf.spawn(this.wolfSpawnSettings));
		this.enemies.push.apply(this.enemies, Phoenix.spawn(this.phoenixSpawnSettings));
		this.enemies.push.apply(this.enemies, Bird.spawn(this.birdSpawnSettings));
	},

	setTileCollisions: function() {
		this.map.setCollisionBetween(2, 19);
		this.map.setCollisionBetween(21, 79);
		this.map.setCollisionBetween(81, 97);
		this.map.setCollisionBetween(101, 117);
	},

	update: function() {
		player.update();
		
		this.enemies.forEach(function(enemy) {
			enemy.update();
		});
	}
};

module.exports = NewLevelOne;

$.extend(NewLevelOne.prototype, Level.prototype);