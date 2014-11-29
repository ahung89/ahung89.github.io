FallingPlatformLevel = function(fallingPlatformSettings) {
	this.fallingPlatforms = null;
	this.fallingPlatformSettings = fallingPlatformSettings;
}

FallingPlatformLevel.prototype = {
	createPlatforms: function() {
		this.fallingPlatforms = game.add.group();

		 this.fallingPlatformSettings.forEach(function(settings) {
		 	var platform = this.fallingPlatforms.create(TILE_SIZE * settings.x, TILE_SIZE * settings.y, 'platform');
		 	game.physics.arcade.enable(platform);
		 	platform.enableBody = true;

		 	platform.body.immovable = true;
		 }, this);
	}
}

module.exports = FallingPlatformLevel;