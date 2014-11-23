var gulp = require('gulp'),
	uglify = require('gulp-uglifyjs'),
	browserify = require('gulp-browserify'),
	jshint = require('gulp-jshint');

gulp.task('default', function() {
	gulp.src(['js/lib/**/*.js', 'js/game/states/LevelState.js', 'js/game/**/*.js', 'js/Main.js'])
		// .pipe(browserify())
		.pipe(uglify('AndrewWorld.min.js'))
		.pipe(gulp.dest('./dist'))
});
