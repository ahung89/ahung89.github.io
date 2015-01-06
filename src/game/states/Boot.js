var Boot = function () {};

module.exports = Boot;

Boot.prototype = {

  preload: function () {
    this.load.image('loading', 'assets/sprites/preloader/loading.png');
    this.load.image('load_progress_bar_dark', 'assets/sprites/preloader/progress_bar_bg.png');
    this.load.image('load_progress_bar', 'assets/sprites/preloader/progress_bar_fg.png');
    this.load.image('city', 'assets/backgrounds/landscape.png');
    this.load.image('how_to_menu', 'assets/sprites/menu/how_to_menu.png');
    this.load.image('credits_menu', 'assets/sprites/menu/credits_menu.png');
  },

  create: function () {
    game.stage.disableVisibilityChange = true; // So that game doesn't stop when window loses focus.
    game.input.maxPointers = 1;

    if (game.device.desktop) {
      game.stage.scale.pageAlignHorizontally = true;
    } else {
      game.stage.scaleMode = Phaser.StageScaleMode.SHOW_ALL;
      game.stage.scale.minWidth =  480;
      game.stage.scale.minHeight = 260;
      game.stage.scale.maxWidth = 640;
      game.stage.scale.maxHeight = 480;
      game.stage.scale.forceLandscape = true;
      game.stage.scale.pageAlignHorizontally = true;
      game.stage.scale.setScreenSize(true);
    }

    game.state.start('Preloader');
  }
};
