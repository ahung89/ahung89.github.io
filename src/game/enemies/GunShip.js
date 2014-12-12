var ProjectileEnemy = require('./types/ProjectileEnemy');

var BULLET_Y_OFFSET = 22;

function GunShip(x, y, direction, initialDelay) {
	Enemy.call(this, x, y, direction, 'gunship', [0], [1], 0);
	ProjectileEnemy.call(this, 1400, initialDelay, 'missile');

 	// this.sprite.body.gravity.y = 300;
	this.sprite.anchor.set(0.5);
}

GunShip.prototype = {
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

GunShip.spawn = function(spawnSettings) {
	var enemies = [];
	spawnSettings.forEach(function(settings) {
		enemies.push(new GunShip(settings.x * TILE_SIZE, settings.y * TILE_SIZE, settings.direction, settings.initialDelay));
	}, this);

	return enemies;
}

$.extend(GunShip.prototype, ProjectileEnemy.prototype);
$.extend(GunShip.prototype, Enemy.prototype);

module.exports = GunShip;