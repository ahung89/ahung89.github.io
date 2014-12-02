require('../../Common');

VineLevel = function(vineTileIndices, vineLayerName, vineThresholdX, vineThresholdY) {
	this.vineTileIndices = vineTileIndices;
	this.vineLayerName = vineLayerName;
	this.vineThresholdX = vineThresholdX;
	this.vineThresholdY = vineThresholdY;
	this.lowestPointOnCurrentVine = null;
};

VineLevel.prototype = {
	setVineCollisions: function() {
		var vineTiles = this.map.getTilesWithIndex(this.map.getLayerIndex(this.vineLayerName), this.vineTileIndices);
		vineTiles.forEach(function(vineTile) {
			vineTile.setCollisionCallback(this.vineCheck, vineTile);
		}, this);
	},

	vineCheck: function() {
		var withinVineThreshold = Math.abs(player.sprite.body.x - this.worldX) < level.vineThresholdX && Math.abs(player.sprite.body.y - this.worldY) < level.vineThresholdY;

		if(!player.climbing && withinVineThreshold) {
			// worldX and worldY are the coordinates on the map. x and y are the TILE coordinates on the TILEMAP.
			player.sprite.body.x = this.worldX;

			var tileIsVine = true;
			var lowestVine;
			var currentTile = this;

			while(true) {
				var tileBelow = level.map.getTile(currentTile.x, currentTile.y + 1, level.map.getLayerIndex(level.vineLayerName));
				if(tileBelow == null || level.vineTileIndices.indexOf(tileBelow.index) < 0) {
					lowestVine = currentTile;
					break;
				}
				currentTile = tileBelow;
			}

			level.lowestPointOnCurrentVine = lowestVine.worldY;

			player.initiateClimbState();
		}
	}
};

module.exports = VineLevel;