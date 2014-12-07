var LandEnemy = require('./LandEnemy.js')

function LandDog(x, y, direction) {
	LandEnemy.call(this, x, y, direction, 'baddie', [0, 1], [2, 3], 150);
}

$.extend(LandDog.prototype, LandEnemy.prototype)

module.exports = LandDog;