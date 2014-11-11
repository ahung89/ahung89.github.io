LevelOneState = function(){
	this.landDogSpawnLocations = [{x:10, y:10}, {x:18, y:8}, {x:27, y:8}, {x:38, y:10},
	{x:43, y:10}, {x: 72, y:5}, {x: 126, y:5}, {x: 142, y:5}, {x: 146, y:5}];
	this.landDogs;

	this.xCameraPos = 0;
	this.yCameraPos = 0;

	this.xSpawnPos = 32;
	this.ySpawnPos = 150;
};

LevelOneState.prototype = {
	preload: function() {
	    player = new Player(game, this.xSpawnPos, this.ySpawnPos);
	    player.preload();

	    hud = new HUD();

	    this.landDogs = new LandDogs(this.landDogSpawnLocations);
	    enemies.push(this.landDogs);
	    this.landDogs.preload();

	    level = new LevelOne(game, this.landDogs);
	    level.preload();
	},

	create: function() {
	    game.physics.startSystem(Phaser.Physics.Arcade);
	    game.time.advancedTiming = true;

	    level.create();
	    player.create();
	    this.landDogs.create();
	},

    update: function() {
	    player.update();
	    level.update();
	    this.landDogs.update();
	},

	restart: function() {
		player.create();

		this.landDogs.killAll();
		this.landDogs.create();

		level.killAllPlatforms(); //Wrap these into a single generic method. Also, learn inheritance.
		level.createPlatforms();

		resetCamera(this.xCameraPos, this.yCameraPos);
	}
};