var Enemy = require('./mixins/Enemy');

function Bird(x, y) {
	Enemy.call(this, x, y, 'right', 'bird', [2, 3], [6, 7], 150);
};

Bird.prototype = {
	update: function() {
		game.physics.arcade.collide(this.sprite, level.layer);
		this.moveLaterally();
	}
}

$.extend(Bird.prototype, Enemy.prototype);

module.exports = Bird;
