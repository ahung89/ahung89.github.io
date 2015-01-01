var PLAYER_WIDTH = 20;
var PLAYER_HEIGHT = 36;
var PLAYER_X_OFFSET = 5;
var PLAYER_Y_OFFSET = 12;

Player = function(xSpawnPos, ySpawnPos) {
    game = game;
    this.sprite = null;
    this.cursors = null;
    this.jumpButton = null;
    this.jumpSound = null;
    this.xSpawnPos = xSpawnPos;
    this.ySpawnPos = ySpawnPos;
    this.yGravity = 400;
};
 
Player.prototype = {
    
    create: function () {
        this.sprite = game.add.sprite(this.xSpawnPos, this.ySpawnPos, 'dude');

        //Uncomment the line below to test the platforms.
        // this.sprite = game.add.sprite(120 * TILE_SIZE, 4 * TILE_SIZE, 'dude');

        this.initializePlayerPhysics();
        this.initializePlayerAnimations();
        this.initializePlayerControls();
        this.initializePlayerAudio();

        this.climbing = false;

        this.sprite.body.setSize(PLAYER_WIDTH, PLAYER_HEIGHT, PLAYER_X_OFFSET, PLAYER_Y_OFFSET);

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
        if(!this.ignorePlayerCollisions) {
            this.updateCollisions();
        }

        if(!this.deathInitiated) {
            if(this.climbing) {
                this.updateMovementOnVine();
            } else {
                this.updateMovement();
            }
        }
        
        this.sprite.checkWorldBounds = true;
        this.killIfOutOfBounds();
    },

    killIfOutOfBounds: function() {
        var maxHeight = this.deathInitiated ? game.camera.view.y + game.camera.height : game.world.height;

        if(this.sprite.position.y > maxHeight) {
            this.killPlayer();
        }
    },

    updateCollisions: function() {
        game.physics.arcade.collide(this.sprite, level.layer);
        game.physics.arcade.overlap(this.sprite, level.flag, level.triggerVictory, null, level);
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

    initiateDeath: function() {
        // only one death animation can be in progress at once.
        // This field is reset after the player is killed.
        if(!this.deathInitiated) {
            this.deathInitiated = true;

            game.camera.unfollow();

            level.freezeSpritesAndProjectiles();

            this.sprite.body.allowGravity = false;
            this.sprite.body.velocity.x = 0;
            this.sprite.body.velocity.y = 0;

            this.sprite.anchor.setTo(0.5, 0.5);

            var tween = game.add.tween(this.sprite);
            tween.to({angle: 540}, 250, null);
            tween.onComplete.add(function() {
                this.sprite.body.velocity.y = 700;
                this.ignorePlayerCollisions = true;
            }, this);
            tween.start();
        }
    },

    killPlayer: function() {
        // console.trace();
        this.ignorePlayerCollisions = false;
        this.deathInitiated = false;
        this.sprite.body.allowGravity = true;
        this.sprite.body.gravity.y = this.yGravity;

        this.sprite.kill();
        level.restart();
        level.fadeIn();
    }
};

module.exports = Player