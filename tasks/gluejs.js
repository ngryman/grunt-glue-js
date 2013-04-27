/*
 * grunt-contrib-connect
 * http://gruntjs.com/
 *
 * Copyright (c) 2013 "ngryman" Nicolas Gryman
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
	var Glue = require('gluejs'),
		path = require('path');

	grunt.registerMultiTask('gluejs', 'Build CommonJS modules for the browser', function() {
		// merges task-specific and/or target-specific options with these defaults.
		var options = this.options({
			stripBanners: false,
			process: false
		});

		// normalizes boolean options that accept options objects.
		if (options.stripBanners === true) { options.stripBanners = {}; }
		if (options.process === true) { options.process = {}; }

		// default options for glue
		// TODO: uncomment, waiting https://github.com/mixu/gluejs/issues/11
		//		Glue.defaults({
		//			replace: options.replace
		//		});

		// processes banner and footer.
		var banner = options.banner ? grunt.template.process(options.banner) : '';
		var footer = options.footer ? grunt.template.process(options.footer) : '';

		// iterates over all src-dest file pairs.
		this.files.forEach(function(file) {
			var glue = new Glue();

			// default options for glue
			// TODO: remove, waiting https://github.com/mixu/gluejs/issues/11
			if (options.replace) { glue.replace(options.replace); }

			// export
			if (options.export) { glue.export(options.export); }

			// includes source files - excludes the destination file if it is in the same directory of source(s) file(s)
			file.src.forEach(function(src) {
				if (src !== file.dest) {
					console.log(src);
					glue.include(src);
				}
			});

			glue.render(function(err, output) {
				output = banner + output + footer;
				grunt.file.write(file.dest, output);

				grunt.log.writeln('File "' + file.dest + '" created.');
			});
		});
	});
};