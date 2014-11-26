var EnemyFunctions = require('./mixins/EnemyFunctions');

function Birds(spawnLocations) {
	this.spawnLocations = spawnLocations;
	this.speed = 150;
};

Birds.prototype = {
	preload: function() {
		game.load.spritesheet('bird', 'assets/sprites/bluebirdsprite.png', 48, 32);
	},

	create: function() {
		this.enemies = game.add.group();
		this.enemies.enableBody = true;
		this.spawnLocations.forEach(function(location) {
			var bird = this.enemies.create(location.x * TILE_SIZE, location.y * TILE_SIZE, 'bird');
			this.createBird(bird, location.x * TILE_SIZE);
			}, this
		);
	},

	createBird: function(bird, xLocation) {
		bird.previousXPosition = xLocation;
		bird.animations.add('left', [2, 3], 10, true);
		bird.animations.add('right', [6, 7], 10, true);
		bird.frame = 1;
		bird.body.collideWorldBounds = true;
		bird.currentDirection = 'right';
	},

	update: function() {
		this.enemies.forEach(function(enemy) {
			this.moveLaterally(enemy);
		}, this);
	},
};

$.extend(Birds.prototype, EnemyFunctions);

module.exports = Birds;