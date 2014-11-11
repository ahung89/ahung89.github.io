LevelTwoState = function() {
	this.xSpawnPos = 0;
	this.ySpawnPos = 0;
}

LevelTwoState.prototype = {
	preload: function() {
		player = new Player(game);
		player.preload();

		level = new LevelTwo(game);
		level.preload();
	},

	create: function() {
		game.physics.startSystem(Phaser.Physics.Arcade);
		game.time.advancedTiming = true;

		level.create();
		player.create();
	},

	update: function() {
		player.update();
		level.update();
	},

	restart: function() {
		player.create();
		resetCamera(xSpawnPos, ySpawnPos);
	}
}