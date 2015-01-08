var Player = require('../Player');
var FadableState = require('./state_types/FadableState.js');
var Flag = require('../entities/Flag');
var Checkpoint = require('../entities/Checkpoint');

function Level() {
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

	playMusic: function() {
		music.stop();
		music = game.add.audio('level_theme', 1, true);
		music.play('', 0, .4, true);
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
	},

	createCheckpoints: function(checkpointSettings) {
		checkpointSettings.forEach(function(settings) {
			var checkpoint = new Checkpoint(settings.x, settings.y - game.cache.getImage('flag').height + TILE_SIZE);
			this.checkpoints.add(checkpoint);
		}, this);
	},

	 // in overlap/collide with group, the group member is the second parameter.
	triggerCheckpoint: function(sprite1, touchedCheckpoint) { // Physics.Arcade.prototype.overlap automatically passes in both sprites
		if(touchedCheckpoint.triggered) {
			return;
		}

		// Trigger all prior checkpoints if they haven't yet been triggered.
		for(var x = 0; x < this.checkpoints.children.length; x++) {
			var checkpoint = this.checkpoints.children[x];
			if(checkpoint === touchedCheckpoint) {
				checkpoint.trigger();
				break;
			} else if(!checkpoint.triggered) {
				checkpoint.trigger();
			}
		}

 		player.xSpawnPos = touchedCheckpoint.x;
 		player.ySpawnPos = touchedCheckpoint.y;
	},

	createVictoryFlag: function(x, y) {
		this.victoryFlag = new Flag(x, y);
		game.add.existing(this.victoryFlag);
	},

	triggerVictory: function() {
		this.victoryFlag.frame = 1;
		this.fadeOut(function() {
			game.state.start('Victory');
		}, this);	
	}
};

$.extend(Level.prototype, FadableState.prototype);

module.exports = Level;