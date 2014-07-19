// Declare the enemies class
function Enemies() {
	this.baddieSpawnLocations = [{x:10, y:10}, {x:18, y:8}, {x:27, y:8}, {x:38, y:10},
	{x:43, y:10}, {x: 72, y:5}];
	this.baddieSpeed = 150;
}

Enemies.prototype = {
	numEnemies: 25,

	preload: function() {
		game.load.spritesheet('baddie', 'assets/baddie.png', 32, 32);
	},

	create: function() {
		this.enemies = game.add.group();
		this.enemies.enableBody = true;
		this.baddieSpawnLocations.forEach(function(location) {
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
				enemy.body.velocity.x = -1 * this.baddieSpeed;
				enemy.animations.play('left');
			} else {
				enemy.body.velocity.x = this.baddieSpeed;
				enemy.animations.play('right');
			}
		}, this);
	},

	changeDirection : function(enemy) {
		if(enemy.currentDirection == 'left') {
			enemy.currentDirection = 'right';
		} else {
			enemy.currentDirection = 'left';
		}
	},

	killAll : function() {
		this.enemies.forEach(function(enemy) {
			enemy.kill();
		});
	}
}