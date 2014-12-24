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

			if('killProjectiles' in enemy) { 
				enemy.killProjectiles();
			}
		}, this);

		if('tearDownLevelComponents' in this) {
			this.tearDownLevelComponents();
		}

		if('buildLevelComponents' in this) {
			this.buildLevelComponents();
		}

		this.createEnemies();

		player.create();
	},

	render: function() {
		if(window.debugging == true) {
			game.debug.body(player.sprite);
			this.enemies.forEach(function(enemy) {
				game.debug.body(enemy.sprite);
				if(enemy.projectiles) {
					enemy.projectiles.forEach(function(projectile) {
						game.debug.body(projectile);
					}, this);
				}
			}, this);
		}
    },

	resetCamera: function() {
		game.camera.x = this.startingCameraPosX;
    	game.camera.y = this.startingCameraPosY;
	}
};

module.exports = Level;