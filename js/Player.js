Player = function(game) {
 
    this.game = game;
    this.sprite = null;
    this.cursors = null;
    this.jumpButton = null;
    this.jumpSound = null;
};
 
Player.prototype = {
 
    preload: function () {
        //  The dimensions are the dimensions of each frame in the spritesheet.
        this.game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
        this.game.load.audio('jump', 'assets/jump.wav'); 
    },
 
    create: function () {
        this.sprite = this.game.add.sprite(32, 150, 'dude');
 
 		this.game.physics.arcade.enable(this.sprite);

        this.sprite.body.gravity.y = 400;

        this.sprite.body.collideWorldBounds = true;

        this.sprite.body.checkCollision.down = true;

        this.sprite.events.onOutOfBounds.add(this.killPlayer, this);

        this.sprite.animations.add('left', [0, 1, 2, 3], 10, true);
        this.sprite.animations.add('right', [5, 6, 7, 8], 10, true);
 
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        //  Linear damping = resistance/friction on the body as it moves through the world.
        this.sprite.body.linearDamping = 1;
        this.game.camera.follow(player.sprite);

        this.jumpSound = this.game.add.audio('jump');
    },
 
    update: function() {
        game.physics.arcade.collide(this.sprite, enemies.enemies, this.killPlayer, null, this);
 
 		//  Collide the player and the stars with the platforms
    	game.physics.arcade.collide(this.sprite, level.layer);

        game.physics.arcade.collide(this.sprite, level.collisionLayer);

        this.sprite.body.velocity.x = 0;

        this.sprite.checkWorldBounds = true;
 
        if(this.cursors.left.isDown)
        {
            this.sprite.body.velocity.x = -250;
 
            this.sprite.animations.play('left');
        }
        else if(this.cursors.right.isDown)
        {
            this.sprite.body.velocity.x = 250;
 
            this.sprite.animations.play('right');
        }
        else
        {
            this.sprite.animations.stop();
            this.sprite.frame = 4;
        }
 
        //  Allow the player to jump if they are touching the ground.
        if (this.jumpButton.isDown && this.sprite.isTouchingGround()){
            console.log("jumping!");
            this.sprite.body.position.y -= 10;
            this.sprite.body.velocity.y = -300;
            this.jumpSound.play();
        }
    },

    killPlayer: function() {
        this.sprite.kill();
        restartGame();
    }
};