'use strict';

/* Dependencies */
const exec = require('child_process').exec;
const join = require('path').join;

/* Constants */
const BABEL = join('.', 'node_modules', 'babel-cli', 'bin', 'babel.js');
const BROWSERIFY = join('.', 'node_modules', 'browserify', 'bin', 'cmd.js');

const SRC_FILE = join('.', 'QBField.js');
const ES5_FILE = join('.', 'QBField.es5.js');
const BROWSERIFY_FILE = join('.', 'QBField.browserify.js');
const MINIFIED_FILE = join('.', 'QBField.browserify.min.js');

/* Main */
return new Promise((resolve, reject) => {
	exec([
		'node ' + BROWSERIFY + ' ' + SRC_FILE + ' > ' + BROWSERIFY_FILE,
		'node ' + BABEL + ' --presets es2015 ' + BROWSERIFY_FILE + ' > ' + ES5_FILE,
		'minify ' + ES5_FILE + ' > ' + MINIFIED_FILE,
		'rm ' + ES5_FILE,
		'rm ' + BROWSERIFY_FILE
	].join(' && '), (err, stdout, stderr) => {
		if (err)
			return reject(new Error(err));

		return resolve();
	});
});
