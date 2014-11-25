var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	browserify = require('browserify'),
	watchify = require('watchify'),
	buffer = require('vinyl-buffer'),
	connect = require('gulp-connect'),
	source = require('vinyl-source-stream'),
	jshint = require('gulp-jshint');

gulp.task('default', ['connect', 'copy', 'copylibs', 'compile']);

paths = {
	assets: 'assets/**/*',
	libs: [
		'bower_components/phaser/build/phaser.js'
	],
	js: ['js/Main.js', 'js/game/**/*.js'],
	entry: './js/Main.js',
	dist: './dist/'
};

gulp.task('compile', function() {
	var bundler = browserify({
		cache: {}, packageCache: {}, fullPaths: true,
		entries:[paths.entry]
	});

	var bundle = function() {
		return bundler
			.bundle()
			.pipe(source('AndrewWorld.min.js'))
			.pipe(buffer())
			.pipe(uglify())
			.pipe(gulp.dest(paths.dist))
	}

	bundler = watchify(bundler);
	bundler.on('update', bundle);

	return bundle();
});

gulp.task('copylibs', function() {
	gulp.src(paths.libs)
		.pipe(gulp.dest(paths.dist + 'js/lib'))
});

gulp.task('copy', function() {
	gulp.src(paths.assets)
		.pipe(gulp.dest(paths.dist + 'assets'))
});

gulp.task('connect', function() {
	connect.server({
		root: [__dirname],
		port: 9000,
		livereload: true
	});
});
