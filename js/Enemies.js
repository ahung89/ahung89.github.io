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
			if(enemy.previousXPosition == enemy.body.position.x || this.checkForCliff(enemy, 'left') || this.checkForCliff(enemy, 'right')) {
				this.changeDirection(enemy);
			}
			// enemy.previousXPosition = enemy.body.position.x;
			// if(enemy.currentDirection == 'left') {
			// 	enemy.body.velocity.x = -150;
			// 	enemy.animations.play('left');
			// } else {
			// 	enemy.body.velocity.x = 150;
			// 	enemy.animations.play('right');
			// }
			this.checkForCliff(enemy, 'right')
		}, this);
	},

	changeDirection : function(enemy) {
		if(enemy.currentDirection == 'left') {
			enemy.currentDirection = 'right';
		} else {
			enemy.currentDirection = 'left';
		}
	},

	checkForCliff: function(enemy, side) {
		var offsetX;

		// Sprite position is top-left corner of sprite, so check to the left (negative offset) if looking for left cliff and check right cliff by
		// adding body width to sprite position to get an x point to the right of the sprite.
		if(side == 'left') {
			offsetX = -1; 
		} else if(side == 'right') {
			offsetX = enemy.body.width;
		}
		var tile = level.map.getTileWorldXY(enemy.body.position.x + offsetX, enemy.body.position.y + enemy.body.height);
		if(enemy.isTouchingGround() && tile && tile.index == 21) {
			console.log("YOU AT THE CLIFF DAWG");
			return true;
		} else {
			return false;
		}
	}
}