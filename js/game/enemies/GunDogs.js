function GunDogs(spawnLocations) {
	this.spawnLocations = spawnLocations;

	this.fireRate = 1000;
	this.nextFire = 0;
};

GunDogs.prototype = {
	preload: function() {
		game.load.spritesheet('baddie', 'assets/sprites/baddie.png', 32, 32);
	},

	create: function() {
		this.enemies = game.add.group();
		this.enemies.enableBody = true;
		this.spawnLocations.forEach(function(location) {
			// .create creates a new Phaser.Sprite object and adds it to the top of this group.
			var baddie = this.enemies.create(location.x * TILE_SIZE, location.y * TILE_SIZE, 'baddie');
			this.createGunDog(baddie, location.x * TILE_SIZE);
			}, this
		);

		this.bullets = game.add.group();
		game.physics.enable(this.bullets, Phaser.Physics.ARCADE);	
	},

	createGunDog: function(baddie, xLocation) {
		baddie.body.gravity.y = 300;
		baddie.previousXPosition = xLocation;
		baddie.animations.add('left', [0, 1], 10, true);
		baddie.animations.add('right', [2, 3], 10, true);
		baddie.frame = 1;
		baddie.body.collideWorldBounds = true;
		baddie.currentDirection = 'left';
		baddie.anchor.set(0.5);
	},

	update: function() {
		this.enemies.forEach(function(enemy) {
			if(game.time.now > this.nextFire) {
				this.nextFire = game.time.now + this.fireRate;
				this.fire(enemy);
			}
		}, this);
	},

	fire: function(enemy) {
		var bullet = this.bullets.create(enemy.body.position.x, enemy.body.position.y + enemy.body.height / 2, 'baddie');
		
		game.physics.enable(bullet, Phaser.Physics.ARCADE); //Creates a default physics body on the object. The object cannot have velocity otherwise.
		bullet.checkWorldBounds = true;
		bullet.outOfBoundsKill = true;
		bullet.anchor.set(0.5);

		if(enemy.currentDirection == 'left') {
			bullet.body.velocity.x = -400;
		} else {
			bullet.body.velocity.x = 400;
		}
	}
};