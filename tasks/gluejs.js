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
		var done = this.async();

		var options = this.options({
			cache: false,
			require: false,
			report: false,
			debug: false
		});

		var n_todo = 0;
		var n_done = 0;
		var n_err = 0;
		var n_files = this.files.length;

		if (!(options.main || ((n_files == 1) && (this.files[0].src.length == 1)))) {
			grunt.fail.fatal("The `main` option to gluejs is mandatory when there is more than one source file.");
			return;
		}

		// processes banner and footer.
		var banner = options.banner ? grunt.template.process(options.banner) : '';
		var footer = options.footer ? grunt.template.process(options.footer) : '';

		// iterates over all src-dest file pairs.
		this.files.forEach(function(file) {
			n_todo = n_todo + 1;

			var glue = new Glue();

			if (options.debug) {
				grunt.log.writeln("processing file '" + file.src + "'");
			}

			if (options.cache !== null) {
				glue.set('cache', options.cache);
			}
			if (options.require !== null) {
				glue.set('require', options.require);
			}
			if (options.report !== null) {
				glue.set('report', options.report);
			}
			//glue.set('cache', false).set('require', false).set('report', true);

			// command
			if (options.command) {
				glue.set('command', options.command);
			}

			// transform
			if (options.transform) {
				glue.options['transform'] = options.transform;
			}

			// basepath
			if (options.basepath) {
				// output paths are relative to this
				glue.basepath(options.basepath);
			}
			else {
				// output paths are relative to this
				glue.basepath(process.cwd());
			}

			// includes source files - excludes the destination file if it is in the same directory of source(s) file(s)
			file.src.forEach(function(src) {
				var relpath = src;
				if (options.basepath)
					relpath = path.relative(options.basepath, relpath);
				if (options.debug) {
					grunt.log.writeln("including '" + src + "' as '" + relpath + "'");
				}
				if (src !== file.dest) {
					// includes all files in the dir
					glue.include(relpath);
				}
			});

			// exclude
			if (options.exclude) {
				glue.exclude(options.exclude);
			}

			if (options.main) {
				// the file that's exported as the root of the package
				glue.main(options.main);
			}
			else if ((n_files == 1) && (file.src.length == 1)) {
				var relpath = file.src[0];
				if (options.basepath)
					relpath = path.relative(options.basepath, relpath);
				glue.main(relpath);
			}

			// export
			if (options.export) {
				glue.export(options.export);
			}

			// replace
			if (options.replace) {
				var obj = options.replace;
				for (var key in obj) {
					if (obj.hasOwnProperty(key)) {
						glue.replace(key, obj[key]);
					}
				}
			}

			if (options.debug) {
				grunt.log.writeln("going to render to '" + file.dest + "'");
				console.log(glue);
			}
			glue.render(function(err, output) {
				if (err) {
					grunt.log.writeln("error:", err);
					grunt.warn.writeln('File "' + file.dest + '" NOT created.');

					n_err++;
				}
				else {
					output = banner + output + footer;
					grunt.file.write(file.dest, output);

					grunt.log.writeln('File "' + file.dest + '" created.');
				}

				n_done++;
				if (n_todo === n_done) {
					// All done!
					done((n_err === 0));
				}
			});
		});
	});
};
