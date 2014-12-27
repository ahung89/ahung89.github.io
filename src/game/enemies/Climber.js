var Enemy = require('./types/Enemy.js');

function Climber(x, y, direction, patrolBounds) {
	Enemy.call(this, x, y, direction,  'baddie', [0, 1], [2, 3], 150, patrolBounds, true);
}

Climber.prototype = {
	update: function() {
		this.handleCollisions();
		this.move();
	}
};

Climber.spawn = function(spawnSettings, group) {
	spawnSettings.forEach(function(settings) {
		group.add(new Climber(settings.x * TILE_SIZE, settings.y * TILE_SIZE, settings.direction, settings.patrolBounds).sprite);
	}, this);
};

$.extend(Climber.prototype, Enemy.prototype);

module.exports = Climber;