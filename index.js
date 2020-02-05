const ejs = require('ejs');
const fs = require('fs');
const path = require('path');
const glob = require('glob');
const mkdirp = require('mkdirp');

const parseJson = (json) => {
	try {
		json = fs.readFileSync(json, 'utf8')
	} catch (e) {
	}

	try {
		json = JSON.parse(json)
	} catch (e) {
		console.error(e.code + ': ' + e.message);
		json = {};
	}

	return json;
};

module.exports = (inputDir, outputDir = undefined, options = {}) => {
	Object.keys(options).map(key => {
		if (options[key] === undefined) {
			delete options[key];
		}
	});

	options = Object.assign({
		pattern: '**/*.ejs',
		ignorePattern: '**/_*.ejs',
		outputExt: 'html',
		optionsJson: undefined,
		dataJson: undefined,
	}, options);

	try {
		fs.statSync(inputDir);

	} catch (e) {
		if (e.code === 'ENOENT') {
			throw new Error('Error: The input directory does not exist.');

		} else {
			throw e;
		}
	}

	if (outputDir) {
		outputDir = path.resolve(outputDir);
		mkdirp.sync(outputDir);

	} else {
		console.log('Notice: No output because the output directory is empty.');
	}

	const ejsOptions = options.optionsJson ? parseJson(options.optionsJson) : {};
	const ejsData = options.dataJson ? parseJson(options.dataJson) : {};

	glob.sync(options.pattern, {
		cwd: inputDir,
		ignore: options.ignorePattern
	}).map(file => {
		const absolutePath = `/${file.replace(/[^\/]*\..+?$/, '')}`;
		const relativePath = '../'.repeat([absolutePath.split(path.sep).length - 2]);

		let runtimeData = {
			relativePath: relativePath,
			absolutePath: absolutePath
		};

		if (ejsData) {
			runtimeData = Object.assign(ejsData, runtimeData);
		}

		ejs.renderFile(path.join(inputDir, file), runtimeData, ejsOptions, function (err, str) {
			if (err) {
				console.error(err);

			} else if (outputDir) {
				let outputFile = path.join(outputDir, file.replace(/^(.*)\..+?$/, '$1.' + options.outputExt));

				mkdirp.sync(path.dirname(outputFile));
				fs.writeFileSync(outputFile, str);
			}
		});
	});

	return true;
};
