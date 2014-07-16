Level = function(game) {
	//These lines are unnecessary.
	this.game = game;
    this.stars = null;
 
    this.map = null;
    this.layer = null;
    this.collisionLayer = null;
}

Level.STARS_NUM = 12;

Level.prototype = {
	preload: function() {
		this.game.load.image('star', 'assets/star.png');
		this.game.load.tilemap('levelOne', 'assets/levelOne.json', null, Phaser.Tilemap.TILED_JSON);
		this.game.load.image('levelOneTiles', 'assets/platformer_tiles_doubled.png');
	},

	create: function() {
		this.game.stage.backgroundColor = '#787878';

		this.map = this.game.add.tilemap('levelOne');
		this.map.addTilesetImage('platformer_tiles_doubled', 'levelOneTiles');

		//	setCollisionBetween - this method sets collision on a range of tiles by tile ID
		//	These numbers refer to the gid, or the index of the tile in the tileset (where the first tile is 1)
		this.map.setCollisionBetween(26, 35);
		this.map.setCollisionBetween(41, 53);
		this.map.setCollisionBetween(59, 72);
		this.map.setCollisionBetween(78, 84);
		this.map.setCollisionBetween(102, 103);
		this.map.setCollisionBetween(105, 108);

		//	The argument must match the layers.name field in your json file.
		//	Creates a TilemapLayer - a TilemapLayer is a set of map data combined with a Tileset.
		this.layer = this.map.createLayer('World');

		this.layer.resizeWorld();

	     //  Finally some stars to collect
	    this.stars = game.add.group();

	    //  We will enable physics for any star that is created in this group
	    this.stars.enableBody = true;

	        //  Here we'll create 12 of them evenly spaced apart
	    // for (var i = 0; i < Level.STARS_NUM; i++)
	    // {
	    //     //  Create a star inside of the 'stars' group
	    //     var star = this.stars.create(i * 70, 0, 'star');

	    //     //  Let gravity do its thing
	    //     star.body.gravity.y = 300;

	    //     //  This just gives each star a slightly random bounce value
	    //     star.body.bounce.y = 0.7 + Math.random() * 0.2;
	    // }
	},

	update: function() {
		game.physics.arcade.collide(this.stars, this.layer);
		game.physics.arcade.collide(enemies.enemies, this.layer);
		game.physics.arcade.collide(enemies.enemies, this.collisionLayer);
	}
}