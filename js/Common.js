function disableLowerWorldBoundsCheck(sprite) {
	    sprite.body.checkWorldBounds = function () {
            if (this.position.x < this.game.physics.arcade.bounds.x && this.game.physics.arcade.checkCollision.left)
            {
                this.position.x = this.game.physics.arcade.bounds.x;
                this.velocity.x *= -this.bounce.x;
                this.blocked.left = true;
            }
            else if (this.right > this.game.physics.arcade.bounds.right && this.game.physics.arcade.checkCollision.right)
            {
                this.position.x = this.game.physics.arcade.bounds.right - this.width;
                this.velocity.x *= -this.bounce.x;
                this.blocked.right = true;
            }

            if (this.position.y < this.game.physics.arcade.bounds.y && this.game.physics.arcade.checkCollision.up)
            {
                this.position.y = this.game.physics.arcade.bounds.y;
                this.velocity.y *= -this.bounce.y;
                this.blocked.up = true;
            }
        };
}

// Allow the sprite to fall off screen
Phaser.Sprite.prototype.checkWorldBounds = function () {
        if (this.position.x < this.game.physics.arcade.bounds.x && this.game.physics.arcade.checkCollision.left)
        {
            this.position.x = this.game.physics.arcade.bounds.x;
            this.velocity.x *= -this.bounce.x;
            this.blocked.left = true;
        }
        else if (this.right > this.game.physics.arcade.bounds.right && this.game.physics.arcade.checkCollision.right)
        {
            this.position.x = this.game.physics.arcade.bounds.right - this.width;
            this.velocity.x *= -this.bounce.x;
            this.blocked.right = true;
        }

        if (this.position.y < this.game.physics.arcade.bounds.y && this.game.physics.arcade.checkCollision.up)
        {
            this.position.y = this.game.physics.arcade.bounds.y;
            this.velocity.y *= -this.bounce.y;
            this.blocked.up = true;
        }
    };

Phaser.Sprite.prototype.isTouchingGround = function() {
    var tile = level.map.getTileWorldXY(this.body.position.x, this.body.position.y + this.body.height);
    return tile && tile.index != 21;
};

Phaser.Sprite.prototype.checkForCliff = function(side) {
    var offsetX;

    // Sprite position is top-left corner of sprite, so check to the left (negative offset) if looking for left cliff and check right cliff by
    // adding body width to sprite position to get an x point to the right of the sprite.
    if(side == 'left') {
        offsetX = -1; 
    } else if(side == 'right') {
        offsetX = enemy.body.width;
    }
    var tile = level.map.getTileWorldXY(this.body.position.x + offsetX, this.body.position.y + this.body.height);
    if(enemy.isTouchingGround() && tile && tile.index == 21) {
        console.log("YOU AT THE CLIFF DAWG");
        return true;
    } else {
        return false;
    }
};