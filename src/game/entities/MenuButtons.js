var MenuButtons = function() {
	this.buttons = [];
	this.scaleTween = null;
	this.subMenu = null;
}

MenuButtons.prototype = {
	draw: function () {
		this.buttons.push(this.addButton('play_button', -40, function() {game.state.start('LevelTwo')}));
		this.buttons.push(this.addButton('how_to_button', 60, this.showHowTo));
		this.buttons.push(this.addButton('credits_button', 160, this.showCredits));

		this.setSelectedAnimation(this.buttons[0]);
	},

	addButton: function (key, yOffset, callback) {
		var button = game.add.button(game.camera.width / 2, game.camera.height / 2 + yOffset, key, callback, this);
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
	},

	showCredits: function() {
		if(this.subMenu != null) {
			return;
		}

		this.subMenu = game.add.image(game.camera.width / 2, game.camera.height / 2, 'credits_menu');
		this.subMenu.anchor.setTo(0.5, 0.5);

		game.input.keyboard.callbackContext = this;

		game.input.keyboard.onDownCallback = function() {
			this.subMenu.kill();
			this.subMenu = null;
			game.input.keyboard.onDownCallback = null;
		};
	},

	showHowTo: function() {
		if(this.subMenu != null) {
			return;
		}

		this.subMenu = game.add.image(game.camera.width / 2, game.camera.height / 2, 'how_to_menu');
		this.subMenu.anchor.setTo(0.5, 0.5);

		game.input.keyboard.callbackContext = this;

		game.input.keyboard.onDownCallback = function() {
			this.subMenu.kill();
			this.subMenu = null;
			game.input.keyboard.onDownCallback = null;
		};
	}
}

module.exports = MenuButtons;