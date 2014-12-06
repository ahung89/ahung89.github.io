var ProjectileEnemy = require('./types/ProjectileEnemy');

var BULLET_Y_OFFSET = 30;

function GunDog(x, y, direction) {
	Enemy.call(this, x, y, direction, 'gun2', [0], [1], 0);
	ProjectileEnemy.call(this, 1000, 0, 'missile');

 	// this.sprite.body.gravity.y = 300;
	this.sprite.anchor.set(0.5);
}

GunDog.prototype = {
	update: function() {
		// this.handleCollisions();
		this.handleProjectileCollisions();

		if(game.time.now > this.nextFire) {
			var xBulletVelocity = this.currentDirection == 'left' ? -400 : 400;
			var bulletXOffset = this.currentDirection == 'left' ? this.sprite.body.position.x : this.sprite.body.position.x + this.sprite.body.width;
			this.fire(bulletXOffset, 
				this.sprite.body.position.y + BULLET_Y_OFFSET,
				 xBulletVelocity, 0);
		}
	}
}

$.extend(GunDog.prototype, ProjectileEnemy.prototype);
$.extend(GunDog.prototype, Enemy.prototype);

module.exports = GunDog;