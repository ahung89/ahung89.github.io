var Enemy = require('./Enemy');

ProjectileEnemy = function (fireRate, nextFire, projectileImage) {
	this.fireRate = fireRate;
	this.nextFire = nextFire;
	this.projectileImage = projectileImage;

	this.projectiles = game.add.group();
	game.physics.enable(this.projectiles, Phaser.Physics.ARCADE);	
}

ProjectileEnemy.prototype = {
	fire: function(xPos, yPos, xVelocity, yVelocity) {
		this.nextFire = game.time.now + this.fireRate;

		// var projectile = this.projectiles.create(enemy.body.position.x + enemy.body.width / 2, enemy.body.position.y + enemy.body.height, this.projectileImageName);
		var projectile = this.projectiles.create(xPos, yPos, this.projectileImage);

		game.physics.enable(projectile, Phaser.Physics.ARCADE); //Creates a default physics body on the object. The object cannot have velocity otherwise.
		projectile.checkWorldBounds = true;
		projectile.outOfBoundsKill = true;
		projectile.anchor.set(0.5);

		projectile.body.velocity.x = xVelocity;
		projectile.body.velocity.y = yVelocity;
	},

	handleProjectileCollisions: function() {
		game.physics.arcade.overlap(this.projectiles, player.sprite, player.killPlayer, null, player);
	}
};

module.exports = ProjectileEnemy;