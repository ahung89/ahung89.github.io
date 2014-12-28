var BLACK_HEX_CODE = "#000000";

function FadableState() {}

module.exports = FadableState;

FadableState.prototype = {
	createFadeTween: function (alphaFrom, alphaTo) {
		var graphics = game.add.graphics(0, 0);
		graphics.beginFill(BLACK_HEX_CODE, 1);
		graphics.drawRect(0, 0, game.camera.width, game.camera.height);
		graphics.alpha = alphaFrom;
		graphics.endFill();

		var tween = game.add.tween(graphics);
		tween.to({alpha: alphaTo}, 500, null);
		return tween;
	},

	createFadeInTween: function() {
		return this.createFadeTween(1, 0);
	},

	createFadeOutTween: function() {
		return this.createFadeTween(0, 1);
	},

	fadeOut: function(nextState) {
		var fadeOutTween = this.createFadeOutTween();
			fadeOutTween.onComplete.add(function() {
				// Can't start the fade-in right after this because game.state.start just places the next state into a queue. It doesn't
				// actually make the call to "create". So the fade will be activated before the maps tiles and stuff get loaded, so there
				// won't actually be a fade effect.
				game.state.start(nextState);
				// this.createFadeTween('in').start();
			}, this);
		fadeOutTween.start();
	},

	fadeIn: function() {
		this.createFadeInTween().start();
	}
}