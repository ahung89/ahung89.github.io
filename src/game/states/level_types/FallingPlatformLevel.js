var PLATFORM_CHECK_RAY_LENGTH = 16;
var PLATFORM_LENGTH = 128;
var PLATFORM_SIDE_CUSHION = 1;
var PLATFORM_DROP_DELAY_MILLISECONDS = 200;

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
		 	platform.dropping = false;

		 	platform.body.immovable = true;
		 }, this);
	},

	checkFallingPlatformCollisions: function() {
		this.fallingPlatforms.forEach(function(platform) {
			game.physics.arcade.collide(platform, player.sprite, this.dropIfNecessary, null, this);
		}, this);
	},

	dropIfNecessary: function(platform, player) {
		if(this.checkPlayerOnPlatform(platform, player)) {
			if(!platform.dropping) {
				platform.dropping = true;
				game.time.events.add(PLATFORM_DROP_DELAY_MILLISECONDS, function(platform) {
					platform.body.gravity.y = 150;
				}, this, platform);
			}
		}
	},

	checkPlayerOnPlatform: function(platform, player) {
		var playerLeftRay = new Phaser.Line(player.body.x, player.body.bottom, player.body.x, player.body.bottom + PLATFORM_CHECK_RAY_LENGTH);
		var playerRightRay = new Phaser.Line(player.body.x + player.body.width, player.body.bottom, player.body.x + player.body.width, player.body.bottom + PLATFORM_CHECK_RAY_LENGTH);

		var platformRay = new Phaser.Line(platform.body.center.x - PLATFORM_LENGTH / 2 + PLATFORM_SIDE_CUSHION, platform.body.center.y, platform.body.center.x + PLATFORM_LENGTH / 2 - PLATFORM_SIDE_CUSHION,
		 platform.body.center.y);

		return playerLeftRay.intersects(platformRay) != null ||
			   playerRightRay.intersects(platformRay);
	}	
};

module.exports = FallingPlatformLevel;