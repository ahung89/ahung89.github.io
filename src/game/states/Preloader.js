var Preloader = function (game) {
  this.ready = false;
};

module.exports = Preloader;

Preloader.prototype = {

  preload: function () {
    this.displayLoadScreen();
    this.loadAssets();
  },

  displayLoadScreen: function () {
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
  },

  loadAssets: function () {
    // Load menu images.
    this.load.image('menu_title', 'assets/sprites/menu/menu_game_title.png');
    this.load.image('menu_arrow', 'assets/sprites/menu/menu_arrow.png');
    this.load.image('menu_button1', 'assets/sprites/menu/menu_button.png');
    this.load.image('menu_button2', 'assets/sprites/menu/menu_button2.png');
    this.load.image('menu_button3', 'assets/sprites/menu/menu_button3.png');

    // Load tiles.
    this.load.tilemap('levelOne', 'assets/levels/levelOne.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('levelOneTiles', 'assets/tiles/platformer_tiles_doubled.png');
    this.load.tilemap('levelTwo', 'assets/levels/levelTwo.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('levelTwoTiles', 'assets/tiles/area01_level_tiles.png');

    // Load paddle.
    this.load.image('platform', 'assets/sprites/misc/paddle-small.png');

    // Load background.
    this.load.image('space', 'assets/backgrounds/space.png');

    // Load enemies.
    this.load.spritesheet('baddie', 'assets/sprites/enemies/baddie.png', 32, 32);
    this.load.spritesheet('wolf', 'assets/sprites/enemies/wolf.png', 58, 42);
    this.load.spritesheet('missile', 'assets/sprites/misc/missile.png', 48, 21);
    this.load.spritesheet('gunship', 'assets/sprites/enemies/gunship.png', 70, 52);
    this.load.spritesheet('phoenix', 'assets/sprites/enemies/phoenixsprite.png', 48, 32);
    this.load.image('fireball', 'assets/sprites/misc/fireball.png');
    this.load.spritesheet('bird', 'assets/sprites/enemies/bluebirdsprite.png', 48, 32);

    // Load assets for main character.
    this.load.spritesheet('dude', 'assets/sprites/player/dude.png', 32, 48);
    this.load.audio('jump', 'assets/sounds/jump.wav'); 
  },

  update: function () {
    if (!!this.ready) { // !! is "bang bang you're a boolean". Not sure why it's necessary here....
      this.game.state.start('Menu');
    }
  },

  onLoadComplete: function () {
    this.ready = true;
  }
};
