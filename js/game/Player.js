Player = function(game, xSpawnPos, ySpawnPos) {
    this.game = game;
    this.sprite = null;
    this.cursors = null;
    this.jumpButton = null;
    this.jumpSound = null;
    this.xSpawnPos = xSpawnPos;
    this.ySpawnPos = ySpawnPos;
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
        this.sprite.body.gravity.y = 400;
        this.sprite.body.collideWorldBounds = true;
        this.sprite.body.checkCollision.down = true;
        this.sprite.events.onOutOfBounds.add(this.killPlayer, this);

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
        this.updateMovement();

        this.sprite.checkWorldBounds = true;
    },

    updateCollisions: function() {
        game.physics.arcade.collide(this.sprite, level.layer);
        // For each enemy type, add collisions to player.
        enemies.forEach(function(enemy) {
            game.physics.arcade.collide(this.sprite, enemy.enemies, this.killPlayer, null, this);
        }, this);
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
 
        if (this.jumpButton.isDown && this.sprite.isTouchingGround()){
            this.sprite.body.position.y -= 5;
            this.sprite.body.velocity.y = -300;
            this.jumpSound.play();
        }
    },

    killPlayer: function() {
        this.sprite.kill();
        restartCurrentLevel();
    }
};