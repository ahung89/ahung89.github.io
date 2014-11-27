Player = function(game, xSpawnPos, ySpawnPos) {
    this.game = game;
    this.sprite = null;
    this.cursors = null;
    this.jumpButton = null;
    this.jumpSound = null;
    this.climbing = false;
    this.xSpawnPos = xSpawnPos;
    this.ySpawnPos = ySpawnPos;
    this.yGravity = 400;
};
 
Player.prototype = {
 
    preload: function () {
        //  The dimensions are the dimensions of each frame in the spritesheet.
        this.game.load.spritesheet('dude', 'assets/sprites/dude.png', 32, 48);
        this.game.load.audio('jump', 'assets/sounds/jump.wav'); 
    },
 
    create: function () {
        this.sprite = this.game.add.sprite(this.xSpawnPos, this.ySpawnPos, 'dude');

        //Uncomment the line below to test the platforms.
        //this.sprite = this.game.add.sprite(90 * TILE_SIZE, 4 * TILE_SIZE, 'dude');

        this.initializePlayerPhysics();
        this.initializePlayerAnimations();
        this.initializePlayerControls();
        this.initializePlayerAudio();
        
        this.game.camera.follow(player.sprite);
    },

    initializePlayerPhysics: function() {
        this.game.physics.arcade.enable(this.sprite);
        this.sprite.body.gravity.y = this.yGravity;
        this.sprite.body.collideWorldBounds = true;
        this.sprite.body.checkCollision.down = true;

        //  Linear damping = resistance/friction on the body as it moves through the world.
        this.sprite.body.linearDamping = 1;
    },

    initializePlayerAnimations: function() {
        this.sprite.animations.add('left', [0, 1, 2, 3], 10, true);
        this.sprite.animations.add('right', [5, 6, 7, 8], 10, true);
    },

    initializePlayerControls: function() {
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);        
    },

    initializePlayerAudio: function() {
        this.jumpSound = this.game.add.audio('jump');
    },
 
    update: function() {
        this.updateCollisions();

        if(this.climbing) {
            this.updateMovementOnVine();
        } else {
            this.updateMovement();
        }

        this.sprite.checkWorldBounds = true;
        if(this.sprite.position.y > this.game.world.height) {
            this.killPlayer();
        }
    },

    updateCollisions: function() {
        game.physics.arcade.collide(this.sprite, level.layer);
        if(level.foreground != null && level.foreground != undefined) {
            game.physics.arcade.collide(this.sprite, level.foreground);    
        }
    },

    updateMovementOnVine: function() {
        this.sprite.body.velocity.y = 0;

        if (this.game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR) && this.cursors.left.isDown) {
            this.jump();
            this.sprite.body.x -= level.vineThresholdX;
            this.endClimb();
        } else if (this.game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR) && this.cursors.right.isDown) {
            this.jump();
            this.sprite.body.x += level.vineThresholdX;
            this.endClimb();
        } else if(this.cursors.up.isDown) {
            this.sprite.body.velocity.y = -150;
        } else if(this.cursors.down.isDown) {
            this.sprite.body.velocity.y = 150;
        } 

        if(this.sprite.body.y > level.lowestPointOnCurrentVine + level.vineThresholdY) {
            this.endClimb();
        }
    },

    updateMovement: function() {
        this.sprite.body.velocity.x = 0;

        if(this.cursors.left.isDown) {
            this.sprite.body.velocity.x = -250;
            this.sprite.animations.play('left');
        } else if(this.cursors.right.isDown) {
            this.sprite.body.velocity.x = 250;
            this.sprite.animations.play('right');
        } else {
            this.sprite.animations.stop();
            this.sprite.frame = 4;
        }
 
        if (this.jumpButton.isDown && this.sprite.isTouchingGround()) {
            this.jump();
        }
    },

    initiateClimbState: function() {
        // TODO: Change the animation
        this.climbing = true;

        this.sprite.body.gravity.y = 0;
        this.sprite.body.velocity.y = 0;
        this.sprite.body.velocity.x = 0;
    },

    jump: function() {
        this.sprite.body.position.y -= 5;
        this.sprite.body.velocity.y = -300;
        this.jumpSound.play();
    },

    endClimb: function() {
        this.climbing = false;
        this.sprite.body.gravity.y = this.yGravity;

    },

    killPlayer: function() {
        //this.sprite.kill();
        //restartCurrentLevel();
    }
};

module.exports = Player