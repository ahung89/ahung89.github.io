var Victory = function() {};

module.exports = Victory;

Victory.prototype = {
	create: function() {
		var victoryImage = game.add.image(game.camera.width / 2, game.camera.height / 2, 'level_completed');
		victoryImage.anchor.setTo(0.5, 0.5);
	},

	update: function() {
		if(game.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
			game.state.start('Menu');
		}
	}
};