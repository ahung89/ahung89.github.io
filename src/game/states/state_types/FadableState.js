var BLACK_HEX_CODE = "#000000";

function FadableState() {}

module.exports = FadableState;

FadableState.prototype = {
	createFadeTween: function (alphaFrom, alphaTo) {
		if(!this.fadeGraphic) {
			this.fadeGraphic = game.add.graphics(0, 0);
			this.fadeGraphic.beginFill(BLACK_HEX_CODE, 1);
			this.fadeGraphic.drawRect(0, 0, game.camera.width, game.camera.height);
			this.fadeGraphic.fixedToCamera = true;
		}

		this.fadeGraphic.alpha = alphaFrom;
		this.fadeGraphic.endFill();

		var tween = game.add.tween(this.fadeGraphic);
		tween.to({alpha: alphaTo}, 500, null);
		return tween;
	},

	createFadeInTween: function() {
		return this.createFadeTween(1, 0);
	},

	createFadeOutTween: function() {
		return this.createFadeTween(0, 1);
	},

	fadeOut: function(callback, callbackContext) {
		callbackContext = callbackContext ? callbackContext : this;

		var fadeOutTween = this.createFadeOutTween();
		
		if(typeof callback === 'function') {
			fadeOutTween.onComplete.add(callback, callbackContext);
		}

		fadeOutTween.start();
	},

	fadeIn: function(callback, callbackContext) {
		callbackContext = callbackContext ? callbackContext : this;

		var fadeInTween = this.createFadeInTween();

		if(typeof callback === 'function') {
			fadeInTween.onComplete.add(callback, this);
		}

		fadeInTween.start();
	}
}