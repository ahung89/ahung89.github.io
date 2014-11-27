require('../Common');

var Enemy = require('./mixins/Enemy');

function LandDog(x, y) {
	Enemy.call(this, x, y, 'right', 'baddie', [0, 1], [2, 3], 150);

	this.sprite.body.gravity.y = 300;
};

LandDog.prototype = {
	update: function() {
		this.handleCollisions();

		this.changeDirectionAtCliff();
		this.moveLaterally();
	},

	changeDirectionAtCliff: function() {
		if((this.currentDirection == 'left' && this.sprite.checkForCliff('left', level.movingPlatforms))
				|| (this.currentDirection == 'right' && this.sprite.checkForCliff('right', level.movingPlatforms))) {
			this.changeDirection();
		}
	}
};

$.extend(LandDog.prototype, Enemy.prototype);

module.exports = LandDog;