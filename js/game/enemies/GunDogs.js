var EnemyFunctions = require('./mixins/EnemyFunctions');
var ProjectileEnemy = require('./mixins/ProjectileEnemy');

function GunDogs(spawnLocations) {
	this.spawnLocations = spawnLocations;

	this.fireRate = 1000;
	this.nextFire = 0;
};

GunDogs.prototype = {
	preload: function() {
		game.load.spritesheet('baddie', 'assets/sprites/baddie.png', 32, 32);
	},

	create: function() {
		this.enemies = game.add.group();
		this.enemies.enableBody = true;
		this.spawnLocations.forEach(function(location) {
			// .create creates a new Phaser.Sprite object and adds it to the top of this group.
			var baddie = this.enemies.create(location.x * TILE_SIZE, location.y * TILE_SIZE, 'baddie');
			this.createGunDog(baddie, location.x * TILE_SIZE);
			}, this
		);

		this.projectiles = game.add.group();
		game.physics.enable(this.projectiles, Phaser.Physics.ARCADE);	
	},

	createGunDog: function(baddie, xLocation) {
		baddie.body.gravity.y = 300;
		baddie.previousXPosition = xLocation;
		baddie.animations.add('left', [0, 1], 10, true);
		baddie.animations.add('right', [2, 3], 10, true);
		baddie.frame = 1;
		baddie.body.collideWorldBounds = true;
		baddie.currentDirection = 'left';
		baddie.anchor.set(0.5);
	},

	update: function() {
		this.enemies.forEach(function(enemy) {
			if(game.time.now > this.nextFire) {
				var xBulletVelocity = enemy.currentDirection == 'left' ? -400 : 400;
				this.fire(enemy.body.position.x, enemy.body.position.y + enemy.body.height / 2, 'baddie', xBulletVelocity, 0);
			}
		}, this);
	}
};

$.extend(GunDogs.prototype, EnemyFunctions);
$.extend(GunDogs.prototype, ProjectileEnemy);

module.exports = GunDogs;