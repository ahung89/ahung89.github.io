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
    this.load.image('menu_title', 'assets/sprites/menu/title.png');
    this.load.image('play_button', 'assets/sprites/menu/play_button.png');
    this.load.image('how_to_button', 'assets/sprites/menu/how_to_button.png');
    this.load.image('credits_button', 'assets/sprites/menu/credits_button.png');

    // Load level select menu images
    this.load.image('select_level', 'assets/sprites/menu/select_level.png');
    this.load.image('forest_of_doom_button', 'assets/sprites/menu/forest_of_doom_button.png');
    this.load.image('space_park_button', 'assets/sprites/menu/space_park_button.png');
    this.load.image('back_button', 'assets/sprites/menu/back_button.png');

    // Load title screens
    this.load.image('level_one_title', 'assets/sprites/menu/levelonetitle.png');
    this.load.image('level_two_title', 'assets/sprites/menu/leveltwotitle.png');

    // Load tiles.
    this.load.tilemap('levelOne', 'assets/levels/levelOne.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('levelOneTiles', 'assets/tiles/area02_level_tiles.png');
    this.load.tilemap('levelTwo', 'assets/levels/levelTwo.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('levelTwoTiles', 'assets/tiles/area01_level_tiles.png');

    // Load miscellaneous sprites/images.
    this.load.image('platform', 'assets/sprites/misc/paddle-small.png');
    this.load.spritesheet('flag', 'assets/sprites/misc/flag.png', 34, 54);

    // Load backgrounds.
    this.load.image('space', 'assets/backgrounds/space.png');
    this.load.image('forest', 'assets/backgrounds/forest.jpg');

    // Load enemies.
    this.load.spritesheet('baddie', 'assets/sprites/enemies/baddie.png', 32, 32);
    this.load.spritesheet('wolf', 'assets/sprites/enemies/wolf.png', 58, 41);
    this.load.spritesheet('missile', 'assets/sprites/misc/missile.png', 48, 21);
    this.load.spritesheet('gunship', 'assets/sprites/enemies/gunship.png', 70, 52);
    this.load.spritesheet('phoenix', 'assets/sprites/enemies/phoenixsprite.png', 48, 32);
    this.load.spritesheet('squirrel', 'assets/sprites/enemies/squirrel.png', 49, 30);
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
