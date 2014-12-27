var ProjectileEnemy = require('./types/ProjectileEnemy');

var BIRD_WIDTH = 45;
var BIRD_HEIGHT = 26;
var BIRD_X_OFFSET = 3;

function Phoenix(x, y, direction, initialDelay, patrolBounds) {
	Enemy.call(this, x, y, direction, 'phoenix', [2, 3], [6, 7], 150, patrolBounds);
	ProjectileEnemy.call(this, 1000, initialDelay, 'fireball');

	this.sprite.body.setSize(BIRD_WIDTH, BIRD_HEIGHT, BIRD_X_OFFSET);

	this.projectileSpeed = 300;
}

Phoenix.prototype = {
	update: function() {
		this.handleCollisions();
		this.handleProjectileCollisions();
		
		this.move();

			if(game.time.now > this.nextFire) {
				this.fire(this.sprite.body.position.x + this.sprite.body.width / 2,
				this.sprite.body.position.y + this.sprite.body.height, 0, 
				this.projectileSpeed);
			}
	}
}

Phoenix.spawn = function(spawnSettings, group) {
	spawnSettings.forEach(function(settings) {
		group.add(new Phoenix(settings.x * TILE_SIZE, settings.y * TILE_SIZE, 
			settings.direction, settings.initialDelay, settings.patrolBounds).sprite);
	}, this);
}

$.extend(Phoenix.prototype, ProjectileEnemy.prototype);
$.extend(Phoenix.prototype, Enemy.prototype);

module.exports = Phoenix;