var buttons = require('../entities/MenuButtons.js');
var arrow = require('../entities/MenuArrow.js');

var Menu = function () {};

module.exports = Menu;

Menu.prototype = {
	create: function () {
		this.gameTitle = game.add.image(game.camera.width / 2, game.world.height / 2 - 150, 'menu_title');
		this.gameTitle.anchor.setTo(0.5, 0.5);
		buttons.draw();
		arrow.draw();
	},

	update: function () {
		arrow.animate();
		arrow.move();
	}
}