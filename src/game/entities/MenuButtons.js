var MenuButtons = function(buttonSettings) {
	this.buttons = [];
	this.scaleTween = null;
	this.subMenu = null;

	buttonSettings.forEach(function(button) {
		this.buttons.push(this.addButton(button.key, button.yOffset, button.callback));
	}, this);

	this.setSelectedAnimation(this.buttons[0]);
}

MenuButtons.prototype = {
	addButton: function (key, yOffset, callback) {
		var button = game.add.image(game.camera.width / 2, game.camera.height / 2 + yOffset, key);
		button.anchor.setTo(.5, .5);
		button.scale.x = .5;
		button.scale.y = .5;
		button.callbackFunction = callback;
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

module.exports = MenuButtons;