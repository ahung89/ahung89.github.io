var EnemyFunctions = require('./mixins/EnemyFunctions');
var ProjectileEnemy = require('./mixins/ProjectileEnemy');

function Phoenixes(spawnLocations) {
	this.spawnLocations = spawnLocations;
	this.speed = 150;
	this.fireRate = 1000;
	this.nextFire = 0;
	this.projectileSpeed = 300;
	this.projectileImageName = 'fireball';
};

Phoenixes.prototype = {
	preload: function() {
		game.load.spritesheet('phoenix', 'assets/sprites/phoenixsprite.png', 48, 32);
		game.load.image(this.projectileImageName, 'assets/sprites/fireball.png');
	},

	create: function() {
		this.enemies = game.add.group();
		this.enemies.enableBody = true;
		this.spawnLocations.forEach(function(location) {
			var phoenix = this.enemies.create(location.x * TILE_SIZE, location.y * TILE_SIZE, 'phoenix');
			this.createPhoenix(phoenix, location.x * TILE_SIZE);
			}, this
		);

		this.projectiles = game.add.group();
		game.physics.enable(this.projectiles, Phaser.Physics.ARCADE);
	},

	createPhoenix: function(phoenix, xLocation) {
		phoenix.previousXPosition = xLocation;
		phoenix.animations.add('left', [2, 3], 10, true);
		phoenix.animations.add('right', [6, 7], 10, true);
		phoenix.frame = 1;
		phoenix.body.collideWorldBounds = true;
		phoenix.currentDirection = 'left';
	},

	update: function() {
		this.enemies.forEach(function(enemy) {
			this.moveLaterally(enemy);

			if(game.time.now > this.nextFire) {
				this.fire(enemy.body.position.x + enemy.body.width / 2,
				 enemy.body.position.y + enemy.body.height,
				  this.projectileImageName, 0, this.projectileSpeed);
			}
		}, this);
	}
};

$.extend(Phoenixes.prototype, EnemyFunctions);
$.extend(Phoenixes.prototype, ProjectileEnemy);

module.exports = Phoenixes;