var buttons = require('../entities/MenuButtons.js');
var arrow = require('../entities/MenuArrow.js');

var Menu = function () {};

module.exports = Menu;

Menu.prototype = {
	create: function () {
		var bg = game.add.tileSprite(0, -10, 810, 613, 'city');
		bg.fixedToCamera = true;

		this.gameTitle = game.add.image(game.camera.width / 2, game.camera.height / 2 - 150, 'menu_title');
		this.gameTitle.anchor.setTo(0.5, 0.5);

		// game.add.tween(this.gameTitle.scale).to({x: 1.1, y: 1.1}, 1000, Phaser.Easing.Quadratic.InOut).yoyo(true).repeat(Number.MAX_VALUE).start();

		// game.add.tween(this.gameTitle).to({angle: -5}, 500, Phaser.Easing.Quadratic.InOut)
		// 	.to({angle: 5}, 500, Phaser.Easing.Quadratic.InOut)
		// 	.loop()
		// 	.start();


		buttons.draw();
		arrow.draw();
	},

	update: function () {
		arrow.animate();
		arrow.move();

		if(game.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
			buttons.buttons[arrow.arrow.currentButton - 1].callback();
		}
	}
}