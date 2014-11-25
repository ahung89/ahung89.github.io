function Phoenixes(spawnLocations) {
	this.spawnLocations = spawnLocations;
	this.phoenixSpeed = 150;
	this.fireRate = 1000;
	this.nextFire = 0;
};

Phoenixes.prototype = {
	preload: function() {
		game.load.spritesheet('phoenix', 'assets/sprites/phoenixsprite.png', 48, 32);
		game.load.image('fireball', 'assets/sprites/fireball.png');
	},

	create: function() {
		this.enemies = game.add.group();
		this.enemies.enableBody = true;
		this.spawnLocations.forEach(function(location) {
			var phoenix = this.enemies.create(location.x * TILE_SIZE, location.y * TILE_SIZE, 'phoenix');
			this.createPhoenix(phoenix, location.x * TILE_SIZE);
			}, this
		);

		this.fireballs = game.add.group();
		game.physics.enable(this.fireballs, Phaser.Physics.ARCADE);
	},

	createPhoenix: function(phoenix, xLocation) {
		phoenix.previousXPosition = xLocation;
		phoenix.animations.add('left', [2, 3], 10, true);
		phoenix.animations.add('right', [6, 7], 10, true);
		phoenix.frame = 1;
		phoenix.body.collideWorldBounds = true;
		phoenix.currentDirection = 'left';
	},

	update: function() {
		this.enemies.forEach(function(enemy) {
			if(enemy.previousXPosition == enemy.body.position.x) {
				this.changeDirection(enemy);
			}

			enemy.previousXPosition = enemy.body.position.x;

			if(enemy.currentDirection == 'left') {
				enemy.body.velocity.x = -1 * this.phoenixSpeed;
				enemy.animations.play('left');
			} else {
				enemy.body.velocity.x = this.phoenixSpeed;
				enemy.animations.play('right');
			}

			if(game.time.now > this.nextFire) {
				this.nextFire = game.time.now + this.fireRate;
				this.fire(enemy);
			}
		}, this);
	},

	changeDirection: function(enemy) {
		if(enemy.currentDirection == 'left') {
			enemy.currentDirection = 'right';
		} else {
			enemy.currentDirection = 'left';
		}
	},

	fire: function(enemy) {
		var fireball = this.fireballs.create(enemy.body.position.x + enemy.body.width / 2, enemy.body.position.y + enemy.body.height, 'fireball');
		
		game.physics.enable(fireball, Phaser.Physics.ARCADE); //Creates a default physics body on the object. The object cannot have velocity otherwise.
		fireball.checkWorldBounds = true;
		fireball.outOfBoundsKill = true;
		fireball.anchor.set(0.5);

		fireball.body.velocity.y = 300;
	}
};

module.exports = Phoenixes;