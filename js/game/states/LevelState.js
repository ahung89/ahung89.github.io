LevelState = function() {
};

LevelState.prototype = {
	preload: function() {
		player = new Player(game, this.spawnPosX, this.spawnPosY);

		player.preload();
		level.preload();

		enemies.forEach(function(enemy) {
			enemy.preload();
		});
	},

	create: function() {
		//Turn this on to enable advanced profiling (fps rate, etc.)
		//game.time.advancedTiming = true;

		level.create();
		player.create();

		enemies.forEach(function(enemy) {
			enemy.create();
		});
	},

	update: function() {
		player.update();
		level.update();
		
		enemies.forEach(function(enemy) {
			enemy.update();
		});
	},

	restart: function() {
		player.create();
		level.restart();
		resetCamera(this.startingCameraPosX, this.startingCameraPosY);
	}
};

module.exports = LevelState;