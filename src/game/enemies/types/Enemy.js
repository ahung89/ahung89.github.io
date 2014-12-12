Enemy = function(x, y, direction, spritesheetKey, minDirectionAnimations, maxDirectionAnimations, speed, patrolBounds, vertical) {
	this.vertical = vertical;

	this.minDirection = vertical ? 'up' : 'left';
	this.maxDirection = vertical ? 'down' : 'right'; 

	this.sprite = game.add.sprite(x, y, spritesheetKey);
	game.physics.enable(this.sprite, Phaser.Physics.ARCADE);

	this.sprite.animations.add(this.minDirection, minDirectionAnimations, 10, true);
	this.sprite.animations.add(this.maxDirection, maxDirectionAnimations, 10, true);
	this.sprite.frame = direction == this.minDirection ? minDirectionAnimations[0] : maxDirectionAnimations[0];

	this.previousPosition;
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
		this.currentDirection = this.currentDirection == this.minDirection ?
			this.maxDirection : this.minDirection;
	},

	move: function() {
		var movementAxisPosition = this.vertical ? this.sprite.body.position.y : this.sprite.body.position.x;

		if(movementAxisPosition == this.previousPosition) {
			this.flip();
		}

		if(this.patrolBounds && this.patrolBoundsReached(movementAxisPosition)) {
			this.flip();
		}

		this.previousPosition = movementAxisPosition;

		if(this.currentDirection == this.minDirection) {
			if(this.vertical) {
				this.sprite.body.velocity.y = -1 * this.speed;
			} else {
				this.sprite.body.velocity.x = -1 * this.speed;
			}
			this.sprite.animations.play(this.minDirection);
		} else {
			if(this.vertical) {
				this.sprite.body.velocity.y = this.speed;
			} else {
				this.sprite.body.velocity.x = this.speed;
			}
			this.sprite.animations.play(this.maxDirection);
		}
	},

	patrolBoundsReached: function(movementAxisPosition) {
		return this.currentDirection == this.minDirection && movementAxisPosition < this.patrolBounds.min
			|| this.currentDirection == this.maxDirection && movementAxisPosition > this.patrolBounds.max;
	}
};

module.exports = Enemy;