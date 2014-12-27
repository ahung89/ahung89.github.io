var LandEnemy = require('./LandEnemy.js')

var SQUIRREL_WIDTH = 46;
var SQUIRREL_HEIGHT = 27;
var SQUIRREL_X_OFFSET = 2;
var SQUIRREL_Y_OFFSET = 0;

function Squirrel(x, y, direction) {
	LandEnemy.call(this, x, y, direction, 'squirrel', [2, 3], [0, 1], 150);

	this.shouldChangeDirectionAtCliff = false;

	this.sprite.body.setSize(SQUIRREL_WIDTH, SQUIRREL_HEIGHT, SQUIRREL_X_OFFSET, SQUIRREL_Y_OFFSET);
	this.sprite.body.gravity.y = 300;
}

Squirrel.spawn = function(spawnSettings) {
	var enemies = [];
	spawnSettings.forEach(function(settings) {
		enemies.push(new Squirrel(settings.x * TILE_SIZE, settings.y * TILE_SIZE, settings.direction));
	}, this);

	return enemies;
};

$.extend(Squirrel.prototype, LandEnemy.prototype)

module.exports = Squirrel;