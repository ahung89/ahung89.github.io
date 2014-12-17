module.exports = {
	buttons: [
		//The callbacks are inline because javascript does not allow you to refer to other properties of the
		//object from within a property. In other words, if I had a function named startLevelOne, I wouldn't be able to set
		//the callback to this.startLevelOne. It would be undefined.
		{key: 'menu_button1', yOffset: -40, callback: function() {game.state.start('LevelOne')}},
		{key: 'menu_button2', yOffset: 60, callback: function() {game.state.start('LevelTwo')}},
		{key: 'menu_button3', yOffset: 160, callback: function() {console.log("this doesn't do shit right now.")}}
	],

	draw: function () {
		this.buttons.forEach(function(button) {
			this.addButton(button.key, button.yOffset, button.callback);
		}, this);
	},

	addButton: function (key, yOffset, callback) {
		var button = game.add.button(game.camera.width / 2, game.camera.height / 2 + yOffset, key, callback, this);
		button.anchor.setTo(0.5, 0.5);
	}
}