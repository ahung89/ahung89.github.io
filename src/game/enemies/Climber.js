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

Climber.spawn = function(spawnSettings) {
	var enemies = [];
	spawnSettings.forEach(function(settings) {
		console.log("spawning a climber");
		enemies.push(new Climber(settings.x * TILE_SIZE, settings.y * TILE_SIZE, settings.direction, settings.patrolBounds));
	}, this);

	return enemies;
};

$.extend(Climber.prototype, Enemy.prototype);

module.exports = Climber;