var Enemy = require('./Enemy');

var ProjectileEnemy = {
	fire: function(xPos, yPos, imageName, xVelocity, yVelocity) {
		this.nextFire = game.time.now + this.fireRate;

		// var projectile = this.projectiles.create(enemy.body.position.x + enemy.body.width / 2, enemy.body.position.y + enemy.body.height, this.projectileImageName);
		var projectile = this.projectiles.create(xPos, yPos, imageName);

		game.physics.enable(projectile, Phaser.Physics.ARCADE); //Creates a default physics body on the object. The object cannot have velocity otherwise.
		projectile.checkWorldBounds = true;
		projectile.outOfBoundsKill = true;
		projectile.anchor.set(0.5);

		projectile.body.velocity.x = xVelocity;
		projectile.body.velocity.y = yVelocity;
	}
};

$.extend(ProjectileEnemy, Enemy);

module.exports = ProjectileEnemy;