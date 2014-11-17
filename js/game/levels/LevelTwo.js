LevelTwo = function(game, birds, gunDogs) {
	this.game = game;
	this.birds = birds;
	this.gunDogs = gunDogs;
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
	}
};
