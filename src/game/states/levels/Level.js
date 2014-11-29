var Player = require('../../Player');

Level = function() {
};

Level.prototype = {
	preload: function() {
		player = new Player(this.spawnPosX, this.spawnPosY);
	},
	
	initLevel: function(tilemapKey, tilesetImage, tilesetImageKey) {
		level = this;

		this.enemies = [];

		game.physics.arcade.setBoundsToWorld();

		this.map = game.add.tilemap(tilemapKey);
		this.map.addTilesetImage(tilesetImage, tilesetImageKey);

		this.setTileCollisions();
	},

	restart: function() {
		this.resetCamera();

		this.enemies.forEach(function(enemy) {
			enemy.sprite.kill();

			if('killProjectiles' in enemy) 
				enemy.killProjectiles();
		}, this);

		if('tearDownLevelComponents' in this) {
			this.tearDownLevelComponents();
		}
		
		this.create();
	},

	resetCamera: function() {
		game.camera.x = this.startingCameraPosX;
    	game.camera.y = this.startingCameraPosY;
	}
};

module.exports = Level;