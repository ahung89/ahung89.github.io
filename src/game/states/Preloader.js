var Preloader = function (game) {
  this.asset = null;
  this.ready = false;
};

module.exports = Preloader;

Preloader.prototype = {

  preload: function () {
    this.asset = this.add.sprite(320, 240, 'preloader');
    this.asset.anchor.setTo(0.5, 0.5);

    // onLoadComplete is dispatched when the final file in the load queue has been loaded/failed. addOnce adds that function as a callback, but only to fire once.
    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.load.setPreloadSprite(this.asset);

    // Load tiles.
    this.load.tilemap('levelOne', 'assets/levels/levelOne.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('levelOneTiles', 'assets/tiles/platformer_tiles_doubled.png');
    this.load.tilemap('levelTwo', 'assets/levels/levelTwo.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('levelTwoTiles', 'assets/tiles/area01_level_tiles.png');

    // Load paddle.
    this.load.image('platform', 'assets/sprites/paddle-small.png');

    // Load enemies.
    this.load.spritesheet('baddie', 'assets/sprites/baddie.png', 32, 32);
    this.load.spritesheet('phoenix', 'assets/sprites/phoenixsprite.png', 48, 32);
    this.load.image('fireball', 'assets/sprites/fireball.png');
    this.load.spritesheet('bird', 'assets/sprites/bluebirdsprite.png', 48, 32);

    // Load assets for main character.
    this.load.spritesheet('dude', 'assets/sprites/dude.png', 32, 48);
    this.load.audio('jump', 'assets/sounds/jump.wav'); 

  },

  create: function () {
    this.asset.cropEnabled = false;
  },

  update: function () {
    if (!!this.ready) { // !! is "bang bang you're a boolean". Not sure why it's necessary here....
      this.game.state.start('LevelOne');
    }
  },

  onLoadComplete: function () {
    this.ready = true;
  }
};
