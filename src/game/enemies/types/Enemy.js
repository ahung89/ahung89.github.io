Enemy = function(x, y, direction, spritesheetKey, leftAnimations, rightAnimations, speed, patrolBounds) {
	this.sprite = game.add.sprite(x, y, spritesheetKey);
	game.physics.enable(this.sprite, Phaser.Physics.ARCADE);

	this.sprite.animations.add('left', leftAnimations, 10, true);
	this.sprite.animations.add('right', rightAnimations, 10, true);
	this.sprite.frame = direction == 'left' ? leftAnimations[0] : rightAnimations[0];

	this.previousXPosition;
	this.currentDirection = direction;
	this.speed = speed;
	this.patrolBounds = patrolBounds;
}

Enemy.prototype = {
	handleCollisions: function() {
		// game.physics.arcade.collide(this.sprite, level.movingPlatforms);
		game.physics.arcade.collide(this.sprite, level.layer);
		game.physics.arcade.overlap(this.sprite, player.sprite, player.killPlayer, null, player);
	},

	flip: function() {
		if(this.currentDirection == 'left') {
			this.currentDirection = 'right';
		} else {
			this.currentDirection = 'left';
		}
	},

	move: function() {
		if(this.sprite.body.position.x == this.previousXPosition) {
			this.flip();
		}

		if(this.patrolBounds && this.patrolBoundsReached()) {
			this.flip();
		}

		this.previousXPosition = this.sprite.body.position.x;

		if(this.currentDirection == 'left') {
			this.sprite.body.velocity.x = -1 * this.speed;
			this.sprite.animations.play('left');
		} else {
			this.sprite.body.velocity.x = this.speed;
			this.sprite.animations.play('right');
		}
	},

	patrolBoundsReached: function() {
		return this.currentDirection == 'left' && this.sprite.body.position.x < this.patrolBounds.xMin
			|| this.currentDirection == 'right' && this.sprite.body.position.x > this.patrolBounds.xMax;
	}
};

module.exports = Enemy;