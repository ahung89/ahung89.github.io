Enemy = function(x, y, direction, image, leftAnimations, rightAnimations, speed) {
	this.sprite = game.add.sprite(x, y, image);
	game.physics.enable(this.sprite, Phaser.Physics.ARCADE);

	this.sprite.animations.add('left', leftAnimations, 10, true);
	this.sprite.animations.add('right', rightAnimations, 10, true);
	this.sprite.frame = 1;
	this.sprite.body.collideWorldBounds = true;

	this.previousXPosition = x;
	this.currentDirection = direction;
	this.speed = speed;
}

Enemy.prototype = {
	handleCollisions: function() {
		// game.physics.arcade.collide(this.sprite, level.movingPlatforms);
		game.physics.arcade.collide(this.sprite, level.layer);
		game.physics.arcade.overlap(this.sprite, player.sprite, player.killPlayer, null, player);
	},

	changeDirection: function() {
		if(this.currentDirection == 'left') {
			this.currentDirection = 'right';
		} else {
			this.currentDirection = 'left';
		}
	},

	moveLaterally : function() {
		if(this.previousXPosition == this.sprite.body.position.x) {
			this.changeDirection();
		}

		this.previousXPosition = this.sprite.body.position.x;

		if(this.currentDirection == 'left') {
			this.sprite.body.velocity.x = -1 * this.speed;
			this.sprite.animations.play('left');
		} else {
			this.sprite.body.velocity.x = this.speed;
			this.sprite.animations.play('right');
		}
	}
};

module.exports = Enemy;