var Flag = function(x, y) {
	Phaser.Sprite.call(this, game, x, y, 'flag');

	game.physics.enable(this, Phaser.Physics.ARCADE);

	this.frame = 0;
};

module.exports = Flag;

Flag.prototype = Object.create(Phaser.Sprite.prototype);
// $.extend(Flag.prototype, Phaser.Sprite.prototype);
// why doesn't it work when I do extend?