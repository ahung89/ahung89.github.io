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
    return this.body.onFloor() || this.body.wasTouching.down === true;
};

Phaser.Sprite.prototype.freeze = function() {
    this.body.velocity.x = 0;
    this.body.velocity.y = 0;
    this.body.allowGravity = false;
    this.animations.stop();
};

Phaser.Sprite.prototype.checkForCliff = function(side, platforms) {
    var offsetX;

    // Sprite position is top-left corner of sprite, so check to the left (negative offset) if looking for left cliff and check right cliff by
    // adding body width to sprite position to get an x point to the right of the sprite.
    if(side == 'left') {
        offsetX = 0; 
    } else if(side == 'right') {
        offsetX = this.body.width;
    }

    var nextToPlatform;

    //First, check if the sprite is about to walk onto a platform.
    platforms.forEach(function(platform) {
        // hitTest tests if a point lies within a body.
        if(platform.body.hitTest(this.body.position.x + offsetX, this.body.position.y + this.body.height)) {
            nextToPlatform = true;
        }
    }, this);

    if(nextToPlatform) {
        return false;
    }

    //If the sprite isn't about to step onto a platform, check if it's about to step onto an empty space tile. If so, then it is at a cliff.
    var tile = level.map.getTileWorldXY(this.body.position.x + offsetX, this.body.position.y + this.body.height);
    if((this.isTouchingGround() && tile && level.emptySpaceTiles.indexOf(tile.index) > -1) || tile == null)     {
        return true;
    }
};

Phaser.Tilemap.prototype.getTilesWithIndex = function(layer, indices) {
    var result = [];
    var layer = this.layers[layer];

    if(indices.length == 1) {
        indices = [indices]; //not sure if this works, lawl.
    }

    for(var row = 0; row < this.height; row++) {
        for(var col = 0; col < this.width; col++) {
            var tile = layer.data[row][col];
            if(indices.indexOf(tile.index) > -1) {
                result.push(tile);
            }
        }
    }

    return result;
};


// Two changes: first, made it so that outOfBoundsKill calls sprite.destroy, not just sprite.kill (to make sure it gets removed
// completely). second, made it so that the parent position isn't factored in for the first if block since this was causing weird
// stuff to happen with the squirrel generation. Still need to figure out what exactly was happening.
Phaser.Sprite.prototype.preUpdate = function() {

    if (this._cache[4] === 1 && this.exists)
    {
        this.world.setTo(this.position.x, this.position.y);
        this.worldTransform.tx = this.world.x;
        this.worldTransform.ty = this.world.y;
        this._cache[0] = this.world.x;
        this._cache[1] = this.world.y;
        this._cache[2] = this.rotation;

        if (this.body)
        {
            this.body.preUpdate();
        }

        this._cache[4] = 0;

        return false;
    }

    this._cache[0] = this.world.x;
    this._cache[1] = this.world.y;
    this._cache[2] = this.rotation;

    if (!this.exists || !this.parent.exists)
    {
        //  Reset the renderOrderID
        this._cache[3] = -1;
        return false;
    }

    if (this.lifespan > 0)
    {
        this.lifespan -= this.game.time.elapsed;

        if (this.lifespan <= 0)
        {
            this.kill();
            return false;
        }
    }

    //  Cache the bounds if we need it
    if (this.autoCull || this.checkWorldBounds)
    {
        this._bounds.copyFrom(this.getBounds());
    }

    if (this.autoCull)
    {
        //  Won't get rendered but will still get its transform updated
        this.renderable = this.game.world.camera.screenView.intersects(this._bounds);
    }

    if (this.checkWorldBounds)
    {
        //  The Sprite is already out of the world bounds, so let's check to see if it has come back again
        if (this._cache[5] === 1 && this.game.world.bounds.intersects(this._bounds))
        {
            this._cache[5] = 0;
            this.events.onEnterBounds.dispatch(this);
        }
        else if (this._cache[5] === 0 && !this.game.world.bounds.intersects(this._bounds))
        {
            //  The Sprite WAS in the screen, but has now left.
            this._cache[5] = 1;
            this.events.onOutOfBounds.dispatch(this);

            if (this.outOfBoundsKill)
            {
                this.destroy();
                return false;
            }
        }
    }

    this.world.setTo(this.game.camera.x + this.worldTransform.tx, this.game.camera.y + this.worldTransform.ty);

    if (this.visible)
    {
        this._cache[3] = this.game.stage.currentRenderOrderID++;
    }

    this.animations.update();

    if (this.body)
    {
        this.body.preUpdate();
    }

    //  Update any Children
    for (var i = 0, len = this.children.length; i < len; i++)
    {
        this.children[i].preUpdate();
    }

    return true;

};