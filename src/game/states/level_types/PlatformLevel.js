PlatformLevel = function(paddleSpeed) {
	this.paddleSpeed = paddleSpeed;
	this.movingPlatforms = null;
};

PlatformLevel.prototype = {
	createPlatforms: function() {
		this.movingPlatforms = game.add.group();

		 this.movingPlatformSettings.forEach(function(settings) {
		 	var platform = this.movingPlatforms.create(TILE_SIZE * settings.x, TILE_SIZE * settings.y, 'platform');
		 	game.physics.arcade.enable(platform);
		 	platform.enableBody = true;

		 	if(settings.initialDirection === 'right') {
		 		platform.leftBounds = platform.body.x;
		 		platform.rightBounds = platform.body.x + (TILE_SIZE * settings.territorySize);
		 		platform.body.velocity.x = settings.speed;
		 	} else if(settings.initialDirection === 'left') {
		 		platform.leftBounds = platform.body.x - (TILE_SIZE * settings.territorySize);
		 		platform.rightBounds = platform.body.x;
		 		platform.body.velocity.x = settings.speed * -1;
		 	}

		 	platform.body.immovable = true; //So that it doesn't fall when you jump on it.
		 }, this);
	},

	movePlatforms: function() {
		this.movingPlatforms.forEach(function(platform) {
			if(platform.body.position.x < platform.leftBounds) {
				platform.body.velocity.x *= -1;
				platform.body.position.x += 1;
			}	
			if(platform.body.position.x > platform.rightBounds) {
				platform.body.velocity.x *= -1;
				platform.body.position.x -= 1;
			} 
		})
	}
};

module.exports = PlatformLevel;