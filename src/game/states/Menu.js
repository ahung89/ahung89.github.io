var MenuButtons = require('../entities/MenuButtons.js');
var arrow = require('../entities/MenuArrow.js');

var Menu = function () {};

module.exports = Menu;

Menu.prototype = {
	create: function () {
		this.buttons = new MenuButtons();

		var bg = game.add.tileSprite(0, -10, 810, 613, 'city');
		bg.fixedToCamera = true;

		this.gameTitle = game.add.image(game.camera.width / 2, game.camera.height / 2 - 150, 'menu_title');
		this.gameTitle.anchor.setTo(0.5, 0.5);

		this.buttons.draw();
		arrow.draw(this.buttons);
	},

	update: function () {
		if(this.subMenu == null) {
			arrow.animate();
			arrow.move();

			if(game.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
				this.buttons.buttons[arrow.arrow.currentButton - 1].callbackFunction.call(this);
				// Before, I was trying to just call the function explicitly yadayada.callbackFunction();
				// What was the scope when I was doing that? Not sure.
			}
		}
	}
}