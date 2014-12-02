var ProjectileEnemy = require('./types/ProjectileEnemy');

function Phoenix(x, y, direction) {
	Enemy.call(this, x, y, direction, 'phoenix', [2, 3], [6, 7], 150);
	ProjectileEnemy.call(this, 1000, 0, 'fireball');

	this.projectileSpeed = 300;
}

Phoenix.prototype = {
	update: function() {
		this.handleCollisions();
		this.handleProjectileCollisions();
		
		this.moveLaterally();

			if(game.time.now > this.nextFire) {
				this.fire(this.sprite.body.position.x + this.sprite.body.width / 2,
				 this.sprite.body.position.y + this.sprite.body.height, 0, 
				 this.projectileSpeed);
			}
	}
}

$.extend(Phoenix.prototype, ProjectileEnemy.prototype);
$.extend(Phoenix.prototype, Enemy.prototype);

module.exports = Phoenix;