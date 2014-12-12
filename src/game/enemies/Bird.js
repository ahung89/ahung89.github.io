var Enemy = require('./types/Enemy');

function Bird(x, y, direction) {
	Enemy.call(this, x, y, direction, 'bird', [2, 3], [6, 7], 150);
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
