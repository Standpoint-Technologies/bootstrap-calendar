module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		connect: {
			server: {
				options: {
					livereload: true,
					open: 'http://localhost:8000'
				},
			},
		},

		less: {
			options: {
				ieCompat: true,
				strictImports: false,
				syncImport: false,
				report: 'min'
			},
			css: {
				options: {
					compress: false,
					yuicompress: false
				},
				files: {
					'css/calendar.css': 'less/calendar.less',
				}
			},
			css_min: {
				options: {
					compress: true,
					yuicompress: true
				},
				files: {
					'css/calendar.min.css': 'css/calendar.css'
				}
			}
		},

		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
					'<%= grunt.template.today("yyyy-mm-dd") %> - ' +
					'https://github.com/Serhioromano/bootstrap-calendar */\n'
			},
			build: {
				src: 'js/calendar.js',
				dest: 'js/calendar.min.js'
			}
		},

		watch: {
			configFiles: {
				files: 'Gruntfile.js',
				options: {
					reload: true
				}
			},

			css: {
				files: 'less/*.less',
				tasks: ['less:css', 'less:css_min']
			}
		}
	});

	// Load the plugin that provides the tasks.
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Default task(s).
	grunt.registerTask('default', ['less:css', 'less:css_min', 'uglify']);

	grunt.registerTask('server', ['connect:server', 'watch']);

};
