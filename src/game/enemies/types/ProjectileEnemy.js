var Enemy = require('./Enemy');

ProjectileEnemy = function (fireRate, initialDelay, projectileImage, projectileSizeSettings, direction) {
	this.projectileSizeSettings = projectileSizeSettings;
	this.direction = direction;

	if(!initialDelay) {
		initialDelay = 0;
	}

	this.fireRate = fireRate;
	this.nextFire = game.time.now + initialDelay;
	this.projectileImage = projectileImage;

	this.projectiles = game.add.group();
	game.physics.enable(this.projectiles, Phaser.Physics.ARCADE);	
}

ProjectileEnemy.prototype = {
	fire: function(xPos, yPos, xVelocity, yVelocity) {
		if(!this.projectiles.exists) { // During level restart, projectiles are destroyed and recreated.
			return false;
		}

		this.nextFire = game.time.now + this.fireRate;

		var projectile = this.projectiles.create(xPos, yPos, this.projectileImage);

		game.physics.enable(projectile, Phaser.Physics.ARCADE); //Creates a default physics body on the object. The object cannot have velocity otherwise.
		projectile.checkWorldBounds = true;
		projectile.outOfBoundsKill = true;
		projectile.anchor.set(0.5);

		projectile.body.velocity.x = xVelocity;

		if(this.direction == 'right') {
			projectile.scale.x *= -1;
		}

		// projectile.body.velocity.x = xVelocity;
		projectile.body.velocity.y = yVelocity;

		if(this.projectileSizeSettings) {
			projectile.body.setSize(this.projectileSizeSettings.width, this.projectileSizeSettings.height, this.projectileSizeSettings.xOffset, this.projectileSizeSettings.yOffset);
		}
	},

	killProjectiles: function() {
		this.projectiles.destroy();
	},

	handleProjectileCollisions: function() {
		game.physics.arcade.overlap(this.projectiles, player.sprite, player.initiateDeath, null, player);
	}
};

module.exports = ProjectileEnemy;