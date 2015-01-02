var MenuButtons = require('../entities/MenuButtons.js');
var MenuArrow = require('../entities/MenuArrow.js');
var FadableState = require('./state_types/FadableState.js');

var Menu = function () {};

module.exports = Menu;

Menu.prototype = {
	create: function () {
		this.buttonYOffsets = {
			1: - 40,
			2: 60,
			3: 160
		};

		this.buttonSettings = [
			{key: 'play_button', yOffset: -40, callback: this.levelSelect},
			{key: 'how_to_button', yOffset: 60, callback: this.showHowTo},
			{key: 'credits_button', yOffset: 160, callback: this.showCredits}];

		// To exit the how-to or credits menu, I can press any button. This is to stop that same button press from
		// taking other actions on the menu (for example if I press the "up" key to exit, I don't want this to exit AND go to
		// the next menu item up).
		this.justExitedSubmenu = false;

		var bg = game.add.tileSprite(0, -10, 810, 613, 'city');
		bg.fixedToCamera = true;

		this.gameTitle = game.add.image(game.camera.width / 2, game.camera.height / 2 - 150, 'menu_title');
		this.gameTitle.anchor.setTo(0.5, 0.5);

		this.buttons = new MenuButtons(this.buttonSettings);
		this.arrow = new MenuArrow('wolf', game.camera.width / 2 - 110, game.camera.height / 2 - 40, this.buttonYOffsets, [4, 5], this.buttons);

		this.fadeIn();
	},

	update: function () {
		if(this.justExitedSubmenu) {
		  	if(!(game.input.keyboard.isDown(Phaser.Keyboard.ENTER)
		 	|| game.input.keyboard.isDown(Phaser.Keyboard.UP)
		  	|| game.input.keyboard.isDown(Phaser.Keyboard.DOWN))) {
		  		this.justExitedSubmenu = false;
		  	}
		}
		else if(this.submenu == null) {
			this.arrow.animate();
			this.arrow.move();

			if(game.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
				this.buttons.buttons[this.arrow.arrow.currentButton - 1].callbackFunction.call(this);
			}
		}
	},

	levelSelect: function() {
		game.state.start("LevelSelect");
	},

	showHowTo: function() {
		this.showSubmenu('how_to_menu');
	},

	showCredits: function() {
		this.showSubmenu('credits_menu');
	},

	showSubmenu: function(submenu) {
		this.submenu = game.add.image(game.camera.width / 2, game.camera.height / 2, submenu);
		this.submenu.anchor.setTo(0.5, 0.5);

		game.input.keyboard.callbackContext = this;

		game.input.keyboard.onDownCallback = function() {
			this.submenu.kill();
			this.submenu = null;
			this.justExitedSubmenu = true;
			game.input.keyboard.onDownCallback = null;
		};
	}
}

$.extend(Menu.prototype, FadableState.prototype);