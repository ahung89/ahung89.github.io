// Declare the enemies class
function Enemies() {}

Enemies.prototype = {
	numEnemies: 25,

	preload: function() {
		game.load.spritesheet('baddie', 'assets/baddie.png', 32, 32);
	},

	create: function() {
		this.enemies = game.add.group();
		this.enemies.enableBody = true;
		for(var i = 1; i < 2; i++) {
			var baddieXLocation = i * 640;
			var baddie = this.enemies.create(baddieXLocation, 200, 'baddie');
			this.createBaddie(baddie, baddieXLocation);
		}
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
			if(enemy.previousXPosition == enemy.body.position.x || enemy.checkForCliff('left') || enemy.checkForCliff('right')) {
				this.changeDirection(enemy);
			}
			enemy.previousXPosition = enemy.body.position.x;
			if(enemy.currentDirection == 'left') {
				enemy.body.velocity.x = -150;
				enemy.animations.play('left');
			} else {
				enemy.body.velocity.x = 150;
				enemy.animations.play('right');
			}
			//enemy.checkForCliff('right')
		}, this);
	},

	changeDirection : function(enemy) {
		if(enemy.currentDirection == 'left') {
			enemy.currentDirection = 'right';
		} else {
			enemy.currentDirection = 'left';
		}
	}
}