require('../Common');

var LandDog = require('../enemies/LandDog');
var PlatformLevel = require('./level_types/PlatformLevel');
var Level = require('./Level');

// Indices of tile types that represent empty space
var PADDLE_SPEED = 130;

LevelOne = function() {
	this.landDogSpawnSettings = [{x:10, y:10, direction: 'right'}, {x:18, y:8, direction: 'right'}, {x:27, y:8, direction: 'right'}, 
	{x:38, y:10, direction: 'right'}, {x:43, y:10, direction: 'right'}, {x: 72, y:5, direction: 'right'}, {x: 126, y:5, direction: 'right'}, 
	{x: 142, y:5, direction: 'right'}, {x: 146, y:5, direction: 'right'}];

	this.startingCameraPosX = 0;
	this.startingCameraPosY = 0;
	this.spawnPosX = 32;
	this.spawnPosY = 150;

	this.map = null;
    this.layer = null;
    this.movingPlatforms = null;

    this.emptySpaceTiles = [21];

    //Territory size is the number of tiles that the platform will move before turning around.
    this.movingPlatformSettings = [{x:98, y:6, territorySize:6, speed:PADDLE_SPEED, initialDirection:'right'},
    {x:120, y:6, territorySize:6, speed:PADDLE_SPEED, initialDirection:'left'},
    {x:124, y:6, territorySize:6, speed:PADDLE_SPEED, initialDirection:'right'},
    {x:140, y:6, territorySize:6, speed:PADDLE_SPEED, initialDirection:'left'},
    {x:144, y:6, territorySize:6, speed:PADDLE_SPEED, initialDirection:'right'},
    {x:160, y:6, territorySize:6, speed:PADDLE_SPEED, initialDirection:'left'}];
}

LevelOne.prototype = {
	
	create: function() {
		this.initLevel('levelOne', 'platformer_tiles_doubled', 'levelOneTiles');

		this.setTileCollisions();

		//	The argument must match the layers.name field in your json file.
		//	Creates a TilemapLayer - a TilemapLayer is a set of map data combined with a Tileset.
		this.layer = this.map.createLayer('World');
		this.layer.resizeWorld();
		this.createEnemies();
		this.createPlatforms();

		player.create();
	},

	createEnemies: function() {
		this.enemies.push.apply(this.enemies, LandDog.spawn(this.landDogSpawnSettings));
	},

	setTileCollisions: function() {
		//	setCollisionBetween - this method sets collision on a range of tiles by tile ID (inclusive at both ends of the range)
		//	These numbers refer to the gid, or the index of the tile in the tileset (where the first tile is 1)
		this.map.setCollisionBetween(4, 7);
		this.map.setCollisionBetween(8, 12);
		this.map.setCollisionBetween(26, 35);
		this.map.setCollisionBetween(41, 53);
		this.map.setCollisionBetween(59, 72);
		this.map.setCollisionBetween(78, 84);
		this.map.setCollisionBetween(102, 103);
		this.map.setCollisionBetween(105, 108);
	},

	update: function() {
		player.update();

		this.movePlatforms();
		game.physics.arcade.collide(player.sprite, this.movingPlatforms);
		
		this.enemies.forEach(function(enemy) {
			game.physics.arcade.collide(enemy.sprite, this.movingPlatforms);
			enemy.update();
		}, this);
	},

	tearDownLevelComponents: function() {
		this.movingPlatforms.destroy();
	},

	buildLevelComponents: function() {
		this.createPlatforms();
	}
};

$.extend(LevelOne.prototype, Level.prototype);
$.extend(LevelOne.prototype, PlatformLevel.prototype);

module.exports = LevelOne;