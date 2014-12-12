var Player = require('../Player');

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
	},

	restart: function() {
		this.resetCamera();

		var tempEnemies = this.enemies;

		// Reset enemies BEFORE killing projectiles to prevent an enemy with a destroyed projectile group to attempt
		// to fire.
		this.enemies = [];

		tempEnemies.forEach(function(enemy) {
			enemy.sprite.kill();

			if('killProjectiles' in enemy) 
				enemy.killProjectiles();
		}, this);

		if('tearDownLevelComponents' in this) {
			this.tearDownLevelComponents();
		}

		this.buildLevelComponents();
		
		this.createEnemies();

		//player = new Player();
		player.create();
	},

	resetCamera: function() {
		game.camera.x = this.startingCameraPosX;
    	game.camera.y = this.startingCameraPosY;
	}
};

module.exports = Level;