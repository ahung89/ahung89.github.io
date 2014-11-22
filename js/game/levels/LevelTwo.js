var VINE_TILE_INDICES = [36, 37, 56, 57];

LevelTwo = function(game, birds, gunDogs, phoenixes) {
	this.game = game;
	this.birds = birds;
	this.gunDogs = gunDogs;
	this.phoenixes = phoenixes;
	this.vineThresholdX = 15;
	this.vineThresholdY = 10;
	this.lowestPointOnCurrentVine = null;
};

LevelTwo.prototype = {
	preload: function() {
		this.game.load.tilemap('levelTwo', 'assets/levels/levelTwo.json', null, Phaser.Tilemap.TILED_JSON);
		this.game.load.image('levelTwoTiles', 'assets/tiles/area01_level_tiles.png');
	},

	create: function() {
		this.game.physics.arcade.setBoundsToWorld();

		this.map = this.game.add.tilemap('levelTwo');
		this.map.addTilesetImage('area01_level_tiles', 'levelTwoTiles');

		this.setTileCollisions();

		this.layer = this.map.createLayer('World');
		this.foreground = this.map.createLayer('Foreground');

		this.layer.resizeWorld();
		this.foreground.resizeWorld();
	},

	update: function() {
		game.physics.arcade.collide(this.birds.enemies, this.layer);
		game.physics.arcade.collide(this.phoenixes.enemies, this.layer);
		game.physics.arcade.collide(this.gunDogs.enemies, this.layer);
		game.physics.arcade.overlap(this.gunDogs.bullets, player.sprite, player.killPlayer, null, player);
	},

	restart: function() {

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

		// Vines
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
};
