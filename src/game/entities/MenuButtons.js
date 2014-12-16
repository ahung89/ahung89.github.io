module.exports = {
	buttons: [
		{key: 'menu_button1', yOffset: -40, callback: this.startLevelOne},
		{key: 'menu_button2', yOffset: 60, callback: this.startLevelTwo},
		{key: 'menu_button3', yOffset: 160, callback: this.showInfo}
	],

	draw: function () {
		this.buttons.forEach(function(button) {
			this.addButton(button.key, button.yOffset, button.callback);
		}, this);
	},

	addButton: function (key, yOffset, callback) {
		var button = game.add.button(game.camera.width / 2, game.camera.height / 2 + yOffset, key, callback);
		button.anchor.setTo(0.5, 0.5);
	},

	startLevelOne: function() {
		game.state.start('LevelOne');
	},

	startLevelTwo: function() {
		game.state.start('LevelTwo');
	},

	showInfo: function() {
		console.log("what it do, son");
	}
}