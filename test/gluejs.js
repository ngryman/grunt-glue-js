'use strict';

var fs = require('fs'),
	chai = require('chai');

chai.should();

describe('gluejs', function() {
	after(function() {
		fs.unlinkSync('test/fixtures/package/index.js');
		fs.unlinkSync('test/fixtures/app.js');
		fs.unlinkSync('test/fixtures/jquery.js');
	});

	it('should build a directory module', function(done) {
		fs.exists('test/fixtures/package/index.js', function(exists) {
			exists.should.be.true;
			done();
		});
	});

	it('should ignore destination file', function(done) {
		fs.stat('test/fixtures/package/index.js', function(err, stats) {
			stats.size.should.lessThan(1000);
			done();
		});
	});

	it('should export to the given export option', function(done) {
		fs.readFile('test/fixtures/app.js', 'utf8', function(err, content) {
			content.should.match(/App = require\(\'index.js\'\);/);
			done();
		});
	});

	it('should replace specified values', function(done) {
		fs.readFile('test/fixtures/jquery.js', 'utf8', function(err, content) {
			content.should.match(/"jquery": \{ exports: window\.\$ \}/);
			done();
		});
	});
});