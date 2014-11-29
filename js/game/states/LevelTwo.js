require('../Common');

var Player = require('../Player');
var Bird = require('../enemies/Birds')
var GunDog = require('../enemies/GunDogs')
var Phoenix = require('../enemies/Phoenixes')

var VINE_TILE_INDICES = [36, 37, 56, 57];

LevelTwo= function() {
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

	this.vineThresholdX = 15;
	this.vineThresholdY = 10;
	this.lowestPointOnCurrentVine = null;
};


LevelTwo.prototype = {
	preload: function() {
		player = new Player(this.spawnPosX, this.spawnPosY);
	},

	create: function() {
		level = this;

		player.create();

		game.physics.arcade.setBoundsToWorld();

		this.map = game.add.tilemap('levelTwo');
		this.map.addTilesetImage('area01_level_tiles', 'levelTwoTiles');

		this.setTileCollisions();

		this.layer = this.map.createLayer('World');
		this.foreground = this.map.createLayer('Foreground');

		this.layer.resizeWorld();
		this.foreground.resizeWorld();

		this.createEnemies(Bird, this.birdSpawnLocations);
		this.createEnemies(Phoenix, this.phoenixSpawnLocations);
		this.createEnemies(GunDog, this.gunDogSpawnLocations);
	},

	createEnemies: function(EnemyType, spawnLocations) {
		spawnLocations.forEach(function(location) {
			this.enemies.push(new EnemyType(location.x * TILE_SIZE, location.y * TILE_SIZE));
		}, this);
	},

	update: function() {
		player.update();
		
		this.enemies.forEach(function(enemy) {
			enemy.update();
		});
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

	setVineCollisions: function() {
		var vineTiles = this.map.getTilesWithIndex(this.map.getLayerIndex('Foreground'), VINE_TILE_INDICES);
		vineTiles.forEach(function(vineTile) {
			vineTile.setCollisionCallback(this.vineCheck, vineTile);
		}, this);
	},

	vineCheck: function() {
		var withinVineThreshold = Math.abs(player.sprite.body.x - this.worldX) < level.vineThresholdX && Math.abs(player.sprite.body.y - this.worldY) < level.vineThresholdY;

		if(!player.climbing && withinVineThreshold) {
			// worldX and worldY are the coordinates on the map. x and y are the TILE coordinates on the TILEMAP.
			player.sprite.body.x = this.worldX;

			var tileIsVine = true;
			var lowestVine;
			var currentTile = this;

			while(true) {
				var tileBelow = level.map.getTile(currentTile.x, currentTile.y + 1, level.map.getLayerIndex('Foreground'));
				if(tileBelow == null || VINE_TILE_INDICES.indexOf(tileBelow.index) < 0) {
					lowestVine = currentTile;
					break;
				}
				currentTile = tileBelow;
			}

			level.lowestPointOnCurrentVine = lowestVine.worldY;

			player.initiateClimbState();
		}
	}
}

module.exports = LevelTwo;