module.exports = {
	buttons: [
		//The callbacks are inline because javascript does not allow you to refer to other properties of the
		//object from within a property. In other words, if I had a function named startLevelOne, I wouldn't be able to set
		//the callback to this.startLevelOne. It would be undefined.
		{key: 'play_button', yOffset: -40, callback: function() {game.state.start('LevelOne')}},
		{key: 'how_to_button', yOffset: 60, callback: function() {game.state.start('LevelTwo')}},
		{key: 'credits_button', yOffset: 160, callback: function() {console.log("this doesn't do shit right now.")}}
	],

	draw: function () {
		this.buttons.forEach(function(button) {
			button.button = this.addButton(button.key, button.yOffset, button.callback);
		}, this);
	},

	addButton: function (key, yOffset, callback) {
		var button = game.add.button(game.camera.width / 2, game.camera.height / 2 + yOffset, key, callback, this);
		button.anchor.setTo(.5, .5);
		button.scale.x = .5;
		button.scale.y = .5;
		return button;
	}
}