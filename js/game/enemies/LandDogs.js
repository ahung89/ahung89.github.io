var EnemyFunctions = require('./mixins/EnemyFunctions');

// Declare the enemies class
function LandDogs(spawnLocations) {
	this.spawnLocations = spawnLocations;
	this.dogSpeed = 150;
}

LandDogs.prototype = {
	numEnemies: 25,

	preload: function() {
		game.load.spritesheet('baddie', 'assets/sprites/baddie.png', 32, 32);
	},

	create: function() {
		// .add gets the GameObjectFactory.
		this.enemies = game.add.group();
		this.enemies.enableBody = true;
		this.spawnLocations.forEach(function(location) {
			// .create creates a new Phaser.Sprite object and adds it to the top of this group.
			var baddie = this.enemies.create(location.x * TILE_SIZE, location.y * TILE_SIZE, 'baddie');
			this.createBaddie(baddie, location.x * TILE_SIZE);
			}, this
		);
	},

	createBaddie: function(baddie, xLocation) {
		baddie.body.gravity.y = 300;
		baddie.previousXPosition = xLocation;
		baddie.animations.add('left', [0, 1], 10, true);
		baddie.animations.add('right', [2, 3], 10, true);
		baddie.frame = 1;
		baddie.body.collideWorldBounds = true;
		baddie.currentDirection = 'right';
	},

	update : function() {
		//	Notice the second argument to forEach is 'this' - this makes sure that the context is preserved.
		this.enemies.forEach(function(enemy) {
			if(enemy.previousXPosition == enemy.body.position.x
				|| (enemy.currentDirection == 'left' && enemy.checkForCliff('left', level.movingPlatforms))
				|| (enemy.currentDirection == 'right' && enemy.checkForCliff('right', level.movingPlatforms))) {
				this.changeDirection(enemy);
			}

			enemy.previousXPosition = enemy.body.position.x;

			if(enemy.currentDirection == 'left') {
				enemy.body.velocity.x = -1 * this.dogSpeed;
				enemy.animations.play('left');
			} else {
				enemy.body.velocity.x = this.dogSpeed;
				enemy.animations.play('right');
			}
		}, this);
	}
}

$.extend(LandDogs.prototype, EnemyFunctions);

module.exports = LandDogs;