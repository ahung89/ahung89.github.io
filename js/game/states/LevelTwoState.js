LevelTwoState = function() {
	this.xCameraPos = 0;
	this.yCameraPos = 0;

	this.xSpawnPos = 224;
	this.ySpawnPos = 1440;
};

LevelTwoState.prototype = {
	preload: function() {
		player = new Player(game, this.xSpawnPos, this.ySpawnPos);
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
		resetCamera(this.xCameraPos, this.yCameraPos);
	}
};