'use strict';

var fs = require('fs'),
	chai = require('chai');

chai.should();

describe('gluejs', function() {
	after(function() {
		var stats = fs.statSync('test/fixtures/package/index.js');
		//fs.unlinkSync('test/fixtures/package/index.js');
	});

	it('should build a directory module', function(done) {
		fs.exists('test/fixtures/package/index.js', function(exists) {
			exists.should.be.true;
			done();
		});
	});

	it('should ignore destination file', function(done) {
		fs.stat('test/fixtures/package/index.js', function(err, stats) {
			stats.size.should.equal(697);
			done();
		});
	});

	it('should export to the given export option', function(done) {
		fs.readFile('test/fixtures/app.js', 'utf8', function(err, content) {
			content.should.match(/App = require\(\'index.js\'\);/);
			done();
		});
	});
});