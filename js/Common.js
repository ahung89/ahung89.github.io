// Indices of tile types that represent empty space
var emptySpaceTiles = [21];

var baddieSpawnLocationsX = [400, 640];

//Fill this shit out
var baddieSpawnLocations = [{}];

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
    return tile && emptySpaceTiles.indexOf(tile.index) == -1;
};

Phaser.Sprite.prototype.checkForCliff = function(side) {
    var offsetX;

    // Sprite position is top-left corner of sprite, so check to the left (negative offset) if looking for left cliff and check right cliff by
    // adding body width to sprite position to get an x point to the right of the sprite.
    if(side == 'left') {
        offsetX = -3; 
    } else if(side == 'right') {
        offsetX = this.body.width + 2;
    }
    var tile = level.map.getTileWorldXY(this.body.position.x + offsetX, this.body.position.y + this.body.height);
    if(this.isTouchingGround() && tile && emptySpaceTiles.indexOf(tile.index) > -1) {
        console.log("You are at the cliff.");
        return true;
    } else {
        return false;
    }
};