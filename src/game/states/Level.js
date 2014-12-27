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
	},

	restart: function() {
		this.resetCamera();

		this.enemyGroup.forEach(function(enemy) {
			enemy.kill();

			if('killProjectiles' in enemy.parentEntity) { 
				enemy.parentEntity.killProjectiles();
			}
		}, this);

		this.enemyGroup.destroy();

		if('tearDownLevelComponents' in this) {
			this.tearDownLevelComponents();
		}

		if('buildLevelComponents' in this) {
			this.buildLevelComponents();
		}

		player.create();

		this.enemyGroup = game.add.group();

		this.createEnemies();
	},

	render: function() {
		if(window.debugging == true) {
			game.debug.body(player.sprite);
			this.enemyGroup.forEach(function(enemy) {
				game.debug.body(enemy);
				if(enemy.parentEntity.projectiles) {
					enemy.parentEntity.projectiles.forEach(function(projectile) {
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