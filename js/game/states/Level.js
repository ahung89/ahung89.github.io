var Player = require('../Player');

Level = function() {
};

Level.prototype = {
	preload: function() {
		player = new Player(this.spawnPosX, this.spawnPosY);
	},
	
	initLevel: function(tilemapKey, tilesetImage, tilesetImageKey) {
		level = this;

		game.physics.arcade.setBoundsToWorld();

		this.map = game.add.tilemap(tilemapKey);
		this.map.addTilesetImage(tilesetImage, tilesetImageKey);
	}
};

module.exports = Level;