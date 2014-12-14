var LandEnemy = require('./LandEnemy.js')

var WOLF_WIDTH = 55;
var WOLF_HEIGHT = 37;
var WOLF_Y_OFFSET = 5;

function Wolf(x, y, direction) {
	LandEnemy.call(this, x, y, direction, 'wolf', [0, 1], [2, 3], 150);

	this.sprite.body.setSize(WOLF_WIDTH, WOLF_HEIGHT, 0, WOLF_Y_OFFSET);
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