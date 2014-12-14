var Enemy = require('./types/Enemy');

var BIRD_WIDTH = 45;
var BIRD_HEIGHT = 26;
var BIRD_X_OFFSET = 3;

function Bird(x, y, direction) {
	Enemy.call(this, x, y, direction, 'bird', [2, 3], [6, 7], 150);

	this.sprite.body.setSize(BIRD_WIDTH, BIRD_HEIGHT, BIRD_X_OFFSET);
};

Bird.prototype = {
	update: function() {
		this.handleCollisions();
		this.move();
	}
}

Bird.spawn = function(spawnSettings) {
	var enemies = [];
	spawnSettings.forEach(function(settings) {
		enemies.push(new Bird(settings.x * TILE_SIZE, settings.y * TILE_SIZE, settings.direction));
	}, this);

	return enemies;
};

$.extend(Bird.prototype, Enemy.prototype);

module.exports = Bird;
