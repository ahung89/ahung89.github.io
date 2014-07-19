Phaser.Physics.Arcade.Body.prototype.checkWorldBounds = function () {
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
    return (tile && EMPTY_SPACE_TILES.indexOf(tile.index) == -1) || this.body.wasTouching.down === true;
};

Phaser.Sprite.prototype.checkForCliff = function(side, platforms) {
    var offsetX;

    // Sprite position is top-left corner of sprite, so check to the left (negative offset) if looking for left cliff and check right cliff by
    // adding body width to sprite position to get an x point to the right of the sprite.
    if(side == 'left') {
        offsetX = -10; 
    } else if(side == 'right') {
        offsetX = this.body.width + 9;
    }

    var nextToPlatform;

    //First, check if the sprite is about to walk onto a platform.
    platforms.forEach(function(platform) {
        if(platform.body.hitTest(this.body.position.x + offsetX, this.body.position.y + this.body.height)) {
            nextToPlatform = true;
        }
    }, this);

    if(nextToPlatform) {
        return false;
    }

    //If the sprite isn't about to step onto a platform, check if it's about to step onto an empty space tile. If so, then it is at a cliff.
    var tile = level.map.getTileWorldXY(this.body.position.x + offsetX, this.body.position.y + this.body.height);
    if(this.isTouchingGround() && tile && EMPTY_SPACE_TILES.indexOf(tile.index) > -1)     {
        console.log("first clause");
        return true;
    }
};

Phaser.Physics.Arcade.Body.prototype.hitTest = function (x, y) {
        return Phaser.Rectangle.contains(this, x, y);
    };
