var LandEnemy = require('./LandEnemy.js');

function LandDog(x, y, direction) {
	LandEnemy.call(this, x, y, direction, 'baddie', [0, 1], [2, 3], 150);
}

LandDog.spawn = function(spawnSettings, group) {
	spawnSettings.forEach(function(settings) {
		group.add(new LandDog(settings.x * TILE_SIZE, settings.y * TILE_SIZE, settings.direction));
	}, this);
};

$.extend(LandDog.prototype, LandEnemy.prototype);

module.exports = LandDog;