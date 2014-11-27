var ProjectileEnemy = require('./mixins/ProjectileEnemy');

function GunDog(x, y) {
	Enemy.call(this, x, y, 'left', 'baddie', [0, 1], [2, 3], 0);
	ProjectileEnemy.call(this, 1000, 0, 'baddie');

 	this.sprite.body.gravity.y = 300;
	this.sprite.anchor.set(0.5);
}

GunDog.prototype = {
	update: function() {
		game.physics.arcade.collide(this.sprite, level.layer);
		if(game.time.now > this.nextFire) {
			var xBulletVelocity = this.currentDirection == 'left' ? -400 : 400;
			this.fire(this.sprite.body.position.x, 
				this.sprite.body.position.y + this.sprite.body.height / 2,
				 xBulletVelocity, 0);
		}
	}
}

$.extend(GunDog.prototype, ProjectileEnemy.prototype);
$.extend(GunDog.prototype, Enemy.prototype);

module.exports = GunDog;