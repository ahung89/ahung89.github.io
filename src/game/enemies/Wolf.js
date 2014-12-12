var LandEnemy = require('./LandEnemy.js')

function Wolf(x, y, direction) {
	LandEnemy.call(this, x, y, direction, 'wolf', [0, 1], [2, 3], 150);
}

Wolf.spawn = function(spawnSettings) {
	var enemies = [];
	spawnSettings.forEach(function(settings) {
		enemies.push(new Wolf(settings.x * TILE_SIZE, settings.y * TILE_SIZE, settings.direction));
	}, this);

	return enemies;
};

$.extend(Wolf.prototype, LandEnemy.prototype)

module.exports = Wolf;