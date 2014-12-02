var Enemy = require('./types/Enemy');

function Bird(x, y, direction) {
	Enemy.call(this, x, y, direction, 'bird', [2, 3], [6, 7], 150);
};

Bird.prototype = {
	update: function() {
		this.handleCollisions();
		this.moveLaterally();
	}
}

$.extend(Bird.prototype, Enemy.prototype);

module.exports = Bird;
