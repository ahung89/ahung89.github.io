var Preloader = function (game) {
  this.asset = null;
  this.ready = false;
};

module.exports = Preloader;

Preloader.prototype = {

  preload: function () {
    var centerX = game.camera.width / 2;
    var centerY = game.camera.height / 2;

    this.loading = game.add.sprite(centerX, centerY - 20, 'loading');
    this.loading.anchor.setTo(0.5, 0.5);

    this.barBg = game.add.sprite(centerX, centerY + 40, 'load_progress_bar_dark');
    this.barBg.anchor.setTo(0.5, 0.5);

    this.bar = game.add.sprite(centerX - 192, centerY + 40, 'load_progress_bar');
    this.bar.anchor.setTo(0, 0.5);
    this.load.setPreloadSprite(this.bar);

    // onLoadComplete is dispatched when the final file in the load queue has been loaded/failed. addOnce adds that function as a callback, but only to fire once.
    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);

    // Load tiles.
    this.load.tilemap('levelOne', 'assets/levels/levelOne.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('levelOneTiles', 'assets/tiles/platformer_tiles_doubled.png');
    this.load.tilemap('levelTwo', 'assets/levels/levelTwo.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('levelTwoTiles', 'assets/tiles/area01_level_tiles.png');

    // Loagameddle.
    this.load.image('platform', 'assets/sprites/paddle-small.png');

    // Load background.
    this.load.image('space', 'assets/backgrounds/space.png');

    // Load enemies.
    this.load.spritesheet('baddie', 'assets/sprites/baddie.png', 32, 32);
    this.load.spritesheet('wolf', 'assets/sprites/wolf.png', 58, 42);
    this.load.spritesheet('missile', 'assets/sprites/missile.png', 48, 21);
    this.load.spritesheet('gunship', 'assets/sprites/gunship.png', 70, 52);
    this.load.spritesheet('phoenix', 'assets/sprites/phoenixsprite.png', 48, 32);
    this.load.image('fireball', 'assets/sprites/fireball.png');
    this.load.spritesheet('bird', 'assets/sprites/bluebirdsprite.png', 48, 32);

    // Load assets for main character.
    this.load.spritesheet('dude', 'assets/sprites/dude.png', 32, 48);
    this.load.audio('jump', 'assets/sounds/jump.wav'); 

  },

  update: function () {
    if (!!this.ready) { // !! is "bang bang you're a boolean". Not sure why it's necessary here....
      this.game.state.start('LevelTwo');
    }
  },

  onLoadComplete: function () {
    this.ready = true;
  }
};
