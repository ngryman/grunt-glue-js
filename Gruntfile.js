/*
 * grunt-contrib-gluejs
 * http://gruntjs.com/
 *
 * Copyright (c) 2013 "ngryman" Nicolas Gryman
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
	grunt.initConfig({
		jshint: {
			all: [
				'Gruntfile.js',
				'tasks/*.js',
				'<%= mochacli.files %>'
			],
			options: {
				jshintrc: '.jshintrc'
			}
		},

		mochacli: {
			options: {
				ui: 'bdd',
				reporter: 'spec',
				bail: true,
				recursive: true
			},
			files: 'test/**.js'
		},

		gluejs: {
			directory: {
				src: 'test/fixtures/package/*.js',
				dest: 'test/fixtures/index.js'
			},
			ignore: {
				src: 'test/fixtures/package/*.js',
				dest: 'test/fixtures/index.js'
			},
			export_and_basepath: {
				options: {
					export: 'App',
					basepath: 'test/fixtures/package'
				},
				src: 'test/fixtures/package/a.js',
				dest: 'test/fixtures/app.js'
			},
			replace: {
				options: {
					replace: {
						jquery: 'window.$'
					}
				},
				src: 'test/fixtures/package/jquery.js',
				dest: 'test/fixtures/jquery.js'
			},
			main: {
				options: {
					main: 'main.js'
				},
				src: 'test/fixtures/package/*.js',
				dest: 'test/fixtures/main.js'
			}
		}
	});

	grunt.loadTasks('tasks');

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-mocha-cli');
	grunt.loadNpmTasks('grunt-contrib-internal');

	grunt.registerTask('test', ['gluejs', 'mochacli']);
	grunt.registerTask('default', ['jshint', 'test', 'build-contrib']);
};