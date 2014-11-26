var Enemy = {
	changeDirection: function(enemy) {
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
	},

	moveLaterally : function(enemy) {
		if(enemy.previousXPosition == enemy.body.position.x) {
			this.changeDirection(enemy);
		}

		enemy.previousXPosition = enemy.body.position.x;

		if(enemy.currentDirection == 'left') {
			enemy.body.velocity.x = -1 * this.speed;
			enemy.animations.play('left');
		} else {
			enemy.body.velocity.x = this.speed;
			enemy.animations.play('right');
		}
	}
};

module.exports = Enemy;