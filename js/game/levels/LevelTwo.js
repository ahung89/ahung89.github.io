LevelTwo = function(game) {
	this.game = game;
};

LevelTwo.prototype = {
	preload: function() {
		this.game.load.tilemap('levelTwo', 'assets/levels/levelTwo.json', null, Phaser.Tilemap.TILED_JSON);
		this.game.load.image('levelOneTiles', 'assets/tiles/area01_level_tiles.png');
	},

	create: function() {
		this.game.physics.arcade.setBoundsToWorld();

		this.map = this.game.add.tilemap('levelTwo');
		this.map.addTilesetImage('area01_level_tiles', 'levelTwoTiles');

		this.setTileCollisions();
	},

	update: function() {

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
