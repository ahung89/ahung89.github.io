var Boot = function () {};

module.exports = Boot;

Boot.prototype = {

  preload: function () {
    this.load.image('preloader', 'assets/sprites/preloader.gif');
    this.load.image('loading', 'assets/sprites/loading.png');
    this.load.image('load_progress_bar_dark', 'assets/sprites/progress_bar_bg.png');
    this.load.image('load_progress_bar', 'assets/sprites/progress_bar_fg.png');
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
