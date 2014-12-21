module.exports = {
	buttons: [
		//The callbacks are inline because javascript does not allow you to refer to other properties of the
		//object from within a property. In other words, if I had a function named startLevelOne, I wouldn't be able to set
		//the callback to this.startLevelOne. It would be undefined.
		{key: 'play_button', yOffset: -40, callback: function() {game.state.start('LevelOne')}},
		{key: 'how_to_button', yOffset: 60, callback: function() {game.state.start('LevelTwo')}},
		{key: 'credits_button', yOffset: 160, callback: function() {
			var menu = game.add.image(game.camera.width / 2, game.camera.height / 2, 'credits_menu');
			menu.anchor.setTo(.5, .5);
		}}
	],

	scaleTween: null,

	angleTween: null,

	draw: function () {
		this.buttons.forEach(function(button) {
			button.button = this.addButton(button.key, button.yOffset, button.callback);
		}, this);

		this.setSelectedAnimation(this.buttons[0].button);
	},

	addButton: function (key, yOffset, callback) {
		var button = game.add.button(game.camera.width / 2, game.camera.height / 2 + yOffset, key, callback, this);
		button.anchor.setTo(.5, .5);
		button.scale.x = .5;
		button.scale.y = .5;
		return button;
	},

	setSelectedAnimation: function(button) {
		if(this.scaleTween != null) {
			this.scaleTween.stop(true);
			this.scaleTween.onKill.dispatch();
		}

		game.tweens.removeAll();

		this.scaleTween = game.add.tween(button.scale).to({x: .65, y: .65}, 500, Phaser.Easing.Quadratic.InOut).yoyo(true).repeat(Number.MAX_VALUE).start();

		this.scaleTween.onKill = new Phaser.Signal();

		this.scaleTween.onKill.addOnce(function() {
			button.scale.x = .5;
			button.scale.y = .5;
		}, this);
	}
}