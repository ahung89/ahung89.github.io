module.exports = function(grunt) {
	// These are grunt plugins that are being loaded. As long as the plugin is specified in package.json and has been
	// installed via npm install, it can be enabled as follows:
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-open');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'), //Set pkg to be the object in package.json
		connect: {
			server: {
				options: {
					port:8080,
					base: './deploy'
				}
			}
		},
		copy: {
			main: {
				files: [
					{expand: true, src:['index.html', 'assets/**/*', '<%= pkg.name %>.js'], dest: 'deploy/'}
				]
			}
		},
		concat: { // This task creates the concatenated js file in the deploy folder.
			dist: {
				src: ["js/lib/**/*.js" , "js/game/**/*.js"], //** means partial path match. So the *.js is for anything under the js directory or any of its subdirectories.
				dest: './<%= pkg.name %>.js' // pkg.name is from package.json (Remember pkg was set using package.json just above.)
			}
		},
		watch: { // This task causes the code to be recompiled (via the concat function) each time files matched by the expressions below are modified.
			files: ['js/**/*.js'],
			tasks: ['concat']
		},
		open: { // This task causes the game to be launched when the task is run.
			dev: {
				path: 'http://localhost:8080/index.html'
			}
		}
	});

	// Sets the default grunt task (which is those four tasks in sequence).
	grunt.registerTask('default', ['concat', 'copy', 'connect', 'open', 'watch']);
}