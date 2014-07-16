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

        //  Player physics properties. Give the little guy a slight bounce.
        //this.sprite.body.bounce.y = 0.2;
        this.sprite.body.gravity.y = 400;

        //If this is false, then the little fucker can go offscreen.
        this.sprite.body.collideWorldBounds = true;
 
        //  Our two animations, walking left and right.
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
    	 //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    	 //  The callback function "collectStar" takes the first two arguments as its own arguments. The 'this'
    	 //  is the callback context.
    	game.physics.arcade.overlap(this.sprite, level.stars, this.collectStar, null, this);

        game.physics.arcade.collide(this.sprite, enemies.enemies, this.killPlayer, null, this);
 
 		//  Collide the player and the stars with the platforms
    	game.physics.arcade.collide(this.sprite, level.layer);

        game.physics.arcade.collide(this.sprite, level.collisionLayer);

        this.sprite.body.velocity.x = 0;
 
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
        if (this.jumpButton.isDown && this.sprite.body.onFloor())
        {
            this.sprite.body.velocity.y = -300;
            this.jumpSound.play();
        }

        if(this.sprite.body.position.y = 0) {
            console.log("You dead, yo");
            this.killPlayer();
        }

    },
 	
 	collectStar: function(player, star) {
    
    // Removes the star from the screen
    star.kill();

    //  Add and update the score
    hud.score += 10;
    hud.scoreText.text = 'Score: ' + hud.score;
	},

    killPlayer: function() {
        this.sprite.kill();
    }
};