Enemy = function(x, y, direction, spritesheetKey, leftAnimations, rightAnimations, speed) {
	this.sprite = game.add.sprite(x, y, spritesheetKey);
	game.physics.enable(this.sprite, Phaser.Physics.ARCADE);

	this.sprite.animations.add('left', leftAnimations, 10, true);
	this.sprite.animations.add('right', rightAnimations, 10, true);
	this.sprite.frame = direction == 'left' ? leftAnimations[0] : rightAnimations[0];

	this.previousXPosition;
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
		if(this.sprite.body.position.x == this.previousXPosition) {
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

Enemy.spawn = function(EnemyType, spawnSettings) {
	var enemies = [];
	spawnSettings.forEach(function(settings) {
		enemies.push(new EnemyType(settings.x * TILE_SIZE, settings.y * TILE_SIZE, settings.direction));
	}, this);

	return enemies;
};

module.exports = Enemy;