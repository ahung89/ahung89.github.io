var Flag = require('../entities/Flag');

var Checkpoint = function(x, y) {
	Flag.call(this, x, y);
};

// Why doesn't it work when I use extend?
Checkpoint.prototype = Object.create(Phaser.Sprite.prototype);

Checkpoint.prototype.trigger = function() {
	this.triggered = true;
	this.frame = 1;
}

module.exports = Checkpoint;