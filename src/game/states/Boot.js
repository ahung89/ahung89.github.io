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
    this.game.input.maxPointers = 1;

    if (this.game.device.desktop) {
      this.game.stage.scale.pageAlignHorizontally = true;
    } else {
      this.game.stage.scaleMode = Phaser.StageScaleMode.SHOW_ALL;
      this.game.stage.scale.minWidth =  480;
      this.game.stage.scale.minHeight = 260;
      this.game.stage.scale.maxWidth = 640;
      this.game.stage.scale.maxHeight = 480;
      this.game.stage.scale.forceLandscape = true;
      this.game.stage.scale.pageAlignHorizontally = true;
      this.game.stage.scale.setScreenSize(true);
    }

    this.game.state.start('Preloader');
  }
};
