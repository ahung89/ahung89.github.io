var MenuButtons = require('../entities/MenuButtons.js');
var arrow = require('../entities/MenuArrow.js');

var Menu = function () {};

module.exports = Menu;

Menu.prototype = {
	create: function () {
		this.buttonSettings = [
			{key: 'play_button', yOffset: -40, callback: this.startLevelOne},
			{key: 'how_to_button', yOffset: 60, callback: this.showHowTo},
			{key: 'credits_button', yOffset: 160, callback: this.showCredits}];

		this.justExitedSubmenu = false;

		var bg = game.add.tileSprite(0, -10, 810, 613, 'city');
		bg.fixedToCamera = true;

		this.gameTitle = game.add.image(game.camera.width / 2, game.camera.height / 2 - 150, 'menu_title');
		this.gameTitle.anchor.setTo(0.5, 0.5);

		this.buttons = new MenuButtons(this.buttonSettings);
		arrow.draw(this.buttons);
	},

	update: function () {
		if(this.justExitedSubmenu) {
		  	if(!(game.input.keyboard.isDown(Phaser.Keyboard.ENTER)
		 	|| game.input.keyboard.isDown(Phaser.Keyboard.UP)
		  	|| game.input.keyboard.isDown(Phaser.Keyboard.DOWN))) {
		  		this.justExitedSubmenu = false;
		  	}
		}
		else {
			arrow.animate();
			arrow.move();

			if(game.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
				this.buttons.buttons[arrow.arrow.currentButton - 1].callbackFunction.call(this);
				// Before, I was trying to just call the function explicitly yadayada.callbackFunction();
				// What was the scope when I was doing that? Not sure. Just experimented though and I have a theory. Because the dot
				// operator is right after a Phaser.Button object (trace back through and you'll see why), that became the scope
				// for the callback function. So I think it's just whatever the dot operator is attached to. Side note - console.log(this) is super useful.
				// Doesn't work so hot if concatenated like so though: console.log("context: " + this).
			}
		}
	},

	startLevelOne: function() {
		game.state.start("NewLevelOne");
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
			this.justExitedSubmenu = true;
			game.input.keyboard.onDownCallback = null;
		};
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
			this.justExitedSubmenu = true;
			game.input.keyboard.onDownCallback = null;
		};
	}
}