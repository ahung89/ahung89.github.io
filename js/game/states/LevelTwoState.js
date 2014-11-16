LevelTwoState = function() {
	this.birdSpawnLocations = [{x: 3, y:45}];
	this.gunDogSpawnLocations = [{x: 15, y:45}];

	this.xCameraPos = 0;
	this.yCameraPos = 0;

	this.xSpawnPos = 224;
	this.ySpawnPos = 1440;
};

LevelTwoState.prototype = {
	preload: function() {
		player = new Player(game, this.xSpawnPos, this.ySpawnPos);
		player.preload();

		this.birds = new Birds(this.birdSpawnLocations);
		enemies.push(this.birds);
		this.birds.preload();

		this.gunDogs = new GunDogs(this.gunDogSpawnLocations);
		enemies.push(this.gunDogs);
		this.gunDogs.preload();

		level = new LevelTwo(game, this.birds, this.gunDogs);
		level.preload();
	},

	create: function() {
		game.time.advancedTiming = true;

		level.create();
		player.create();
		this.birds.create();
		this.gunDogs.create();
	},

	update: function() {
		player.update();
		level.update();
		this.birds.update();
		this.gunDogs.update();
	},

	restart: function() {
		player.create();

		this.birds.killAll();
		this.birds.create();

		resetCamera(this.xCameraPos, this.yCameraPos);
	}
};