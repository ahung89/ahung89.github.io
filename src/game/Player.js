Player = function(xSpawnPos, ySpawnPos) {
    game = game;
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
    
    create: function () {
        this.sprite = new Phaser.Sprite(game, this.xSpawnPos, this.ySpawnPos, 'dude');

        game.world.addAt(this.sprite, 3);
        // this.sprite = game.add.sprite(this.xSpawnPos, this.ySpawnPos, 'dude');

        //Uncomment the line below to test the platforms.
        // this.sprite = game.add.sprite(120 * TILE_SIZE, 4 * TILE_SIZE, 'dude');

        this.initializePlayerPhysics();
        this.initializePlayerAnimations();
        this.initializePlayerControls();
        this.initializePlayerAudio();

        this.sprite.body.setSize(26, 38, 3, 10);

        // original size of sprite: height 48, width 32
        
        game.camera.follow(player.sprite);
    },

    initializePlayerPhysics: function() {
        game.physics.arcade.enable(this.sprite);
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
        this.cursors = game.input.keyboard.createCursorKeys();
        this.jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);        
    },

    initializePlayerAudio: function() {
        this.jumpSound = game.add.audio('jump');
    },
 
    update: function() {
        this.updateCollisions();

        if(this.climbing) {
            this.updateMovementOnVine();
        } else {
            this.updateMovement();
        }

        this.sprite.checkWorldBounds = true;
        if(this.sprite.position.y > game.world.height) {
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

        if (game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR) && this.cursors.left.isDown) {
            this.jump();
            this.sprite.body.x -= level.vineThresholdX;
            this.endClimb();
        } else if (game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR) && this.cursors.right.isDown) {
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
        // console.trace();
        this.sprite.kill();
        level.restart();
    }
};

module.exports = Player