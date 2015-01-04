var ProjectileEnemy = require('./types/ProjectileEnemy');

// The offset from the sprite's anchor point at which the bullet will be spawned.
var BULLET_SPAWN_Y_OFFSET = 22;

var PROJECTILE_SETTINGS = {
	width: 48,
	height: 8,
	xOffset: 0,
	yOffset: 0
};

function GunShip(x, y, direction, initialDelay) {
	Enemy.call(this, x, y, direction, 'gunship', [0], [1], 0);
	ProjectileEnemy.call(this, 1400, initialDelay, 'missile', PROJECTILE_SETTINGS, direction);

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
				this.sprite.body.position.y + BULLET_SPAWN_Y_OFFSET,
				 xBulletVelocity, 0);
		}
	}
}

GunShip.spawn = function(spawnSettings, group) {
	spawnSettings.forEach(function(settings) {
		group.add(new GunShip(settings.x * TILE_SIZE, settings.y * TILE_SIZE, settings.direction, settings.initialDelay).sprite);
	}, this);
}

$.extend(GunShip.prototype, ProjectileEnemy.prototype);
$.extend(GunShip.prototype, Enemy.prototype);

module.exports = GunShip;