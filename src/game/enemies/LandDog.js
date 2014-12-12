var LandEnemy = require('./LandEnemy.js');

function LandDog(x, y, direction) {
	LandEnemy.call(this, x, y, direction, 'baddie', [0, 1], [2, 3], 150);
}

LandDog.spawn = function(spawnSettings) {
	var enemies = [];
	spawnSettings.forEach(function(settings) {
		enemies.push(new LandDog(settings.x * TILE_SIZE, settings.y * TILE_SIZE, settings.direction));
	}, this);

	return enemies;
};

$.extend(LandDog.prototype, LandEnemy.prototype);

module.exports = LandDog;