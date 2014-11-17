LevelState = function() {
};

LevelState.prototype = {
	preload: function() {
		player = new Player(game, this.xSpawnPos, this.ySpawnPos);

		player.preload();
		level.preload();

		enemies.forEach(function(enemy) {
			enemy.preload();
		});
	},

	create: function() {
		game.time.advancedTiming = true; //what the heck does this do?

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