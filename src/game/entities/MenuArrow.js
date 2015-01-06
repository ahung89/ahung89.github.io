var MenuButtons = require('./MenuButtons.js');

function MenuArrow(spriteKey, xOffset, initialYOffset, buttonYOffsets, frames, buttons) {
	this.yOffsets = buttonYOffsets;

	this.buttons = buttons;

	// Draw the sprite.
	this.arrow = game.add.sprite(xOffset, initialYOffset, spriteKey);
	this.arrow.anchor.setTo(0.5, 0.5);
	this.arrow.animations.add('move', frames, 5, true);
	this.arrow.frame = frames[0];

	// Initial settings.
	this.arrow.currentButton = 1;
	this.arrow.canMove = true;
}

MenuArrow.prototype = {
	animate: function() {
		this.arrow.animations.play('move');
	},

	move: function() {
		if(game.input.keyboard.isDown(Phaser.Keyboard.DOWN) && this.arrow.canMove && this.arrow.currentButton < 3) {
			this.arrow.currentButton++;
			this.buttons.setSelectedAnimation(this.buttons.buttons[this.arrow.currentButton - 1]);
			this.arrow.position.y = game.camera.height / 2  + this.yOffsets[this.arrow.currentButton];
			this.temporarilyDisableMovement();
		}

		if(game.input.keyboard.isDown(Phaser.Keyboard.UP) && this.arrow.canMove && this.arrow.currentButton > 1) {
			this.arrow.currentButton--;
			this.buttons.setSelectedAnimation(this.buttons.buttons[this.arrow.currentButton - 1]);
			this.arrow.position.y = game.camera.height / 2  + this.yOffsets[this.arrow.currentButton];
			this.temporarilyDisableMovement();
		}
	},

	temporarilyDisableMovement: function() {
		this.arrow.canMove = false;
		game.time.events.add(150, (function() {
			this.arrow.canMove = true;
		}), this);
	}
}

module.exports = MenuArrow;