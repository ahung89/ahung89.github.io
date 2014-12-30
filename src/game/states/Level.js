var Player = require('../Player');
var FadableState = require('./state_types/FadableState.js');

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

		this.enemyGroup = game.add.group();

		this.createEnemies();

		player.create();
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
	},

	displayLevelTitle: function(levelTitle) {
		game.camera.update();

		this.title = game.add.image(game.camera.view.x + game.camera.width / 2, game.camera.view.y - 50, levelTitle);
		this.title.anchor.setTo(0.5, 0.5);

		var tween = game.add.tween(this.title).to({y: game.camera.view.y + game.camera.height / 2}, 1000, Phaser.Easing.Bounce.Out, true);
		tween.onComplete.add(function() {
			this.title.position = new Phaser.Point(game.camera.width / 2, game.camera.height / 2);
			this.title.fixedToCamera = true;

			fadeTween.start();
		}, this);
		
		var fadeTween = game.add.tween(this.title).to({alpha: 0}, 2000, null);
		fadeTween.onComplete.add(function() {
			this.title.destroy();
		}, this);
		tween.start();
	},

	freezeSpritesAndProjectiles: function() {
		this.enemyGroup.forEach(function(enemy) {
			enemy.freeze();
			if('projectiles' in enemy.parentEntity) {
				enemy.parentEntity.projectiles.forEach(function(projectile) {
					projectile.freeze();
				});
			}
		}, this);
	}
};

$.extend(Level.prototype, FadableState.prototype);

module.exports = Level;