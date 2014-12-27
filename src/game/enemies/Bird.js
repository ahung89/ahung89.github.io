var Enemy = require('./types/Enemy');

var BIRD_WIDTH = 45;
var BIRD_HEIGHT = 26;
var BIRD_X_OFFSET = 3;

function Bird(x, y, direction, patrolBounds) {
	Enemy.call(this, x, y, direction, 'bird', [2, 3], [6, 7], 150, patrolBounds);

	this.sprite.body.setSize(BIRD_WIDTH, BIRD_HEIGHT, BIRD_X_OFFSET);
};

Bird.prototype = {
	update: function() {
		this.handleCollisions();
		this.move();
	}
}

Bird.spawn = function(spawnSettings, group) {
	spawnSettings.forEach(function(settings) {
		group.add(new Bird(settings.x * TILE_SIZE, settings.y * TILE_SIZE, settings.direction, 
			settings.patrolBounds).sprite);
	}, this);
};

$.extend(Bird.prototype, Enemy.prototype);

module.exports = Bird;
