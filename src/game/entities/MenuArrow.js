module.exports = {
	yOffsets: {
		1: - 40,
		2: 60,
		3: 160
	},

	draw: function() {
		// Draw the sprite.
		this.arrow = game.add.sprite(game.camera.width / 2 - 110, game.camera.height / 2 - 40, 'wolf');
		this.arrow.anchor.setTo(0.5, 0.5);
		this.arrow.animations.add('walk', [4, 5], 5, true);
		this.arrow.frame = 4;

		// Initial settings.
		this.arrow.currentButton = 1;
		this.arrow.canMove = true;
	},

	animate: function() {
		this.arrow.animations.play('walk');
	},

	move: function() {
		if(game.input.keyboard.isDown(Phaser.Keyboard.DOWN) && this.arrow.canMove && this.arrow.currentButton < 3) {
			this.arrow.currentButton++;
			this.arrow.position.y = game.camera.height / 2  + this.yOffsets[this.arrow.currentButton];
			this.temporarilyDisableMovement();
		}

		if(game.input.keyboard.isDown(Phaser.Keyboard.UP) && this.arrow.canMove && this.arrow.currentButton > 1) {
			this.arrow.currentButton--;
			this.arrow.position.y = game.camera.height / 2  + this.yOffsets[this.arrow.currentButton];
			this.temporarilyDisableMovement();
		}
	},

	temporarilyDisableMovement: function() {
		this.arrow.canMove = false;
		game.time.events.add(255, (function() {
			this.arrow.canMove = true;
		}), this);
	}
}