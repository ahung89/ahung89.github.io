var Victory = function() {};

module.exports = Victory;

Victory.prototype = {
	create: function() {
		var victoryImage = game.add.image(-game.cache.getImage('level_completed').width, game.camera.height / 2, 'level_completed');
		victoryImage.anchor.setTo(0.5, 0.5);

		var tween = game.add.tween(victoryImage);
		tween.to({x: game.camera.width / 2}, 500, null);
		tween.start();
	},

	update: function() {
		if(game.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
			game.state.start('Menu');
		}
	}
};