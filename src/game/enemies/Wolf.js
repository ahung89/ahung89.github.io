var LandEnemy = require('./LandEnemy.js')

function Wolf(x, y, direction) {
	LandEnemy.call(this, x, y, direction, 'wolf', [0, 1], [2, 3], 150);
}

$.extend(Wolf.prototype, LandEnemy.prototype)

module.exports = Wolf;