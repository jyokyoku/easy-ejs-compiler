const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
const easyEjsRenderer = require('../');

const inputDir = __dirname + '/input';
const outputDir = __dirname + '/output';

afterEach(() => {
	rimraf.sync(inputDir);
	rimraf.sync(outputDir);
});

test('Base test', () => {
	const file = 'base-test';

	mkdirp.sync(inputDir);

	fs.writeFileSync(path.join(inputDir, file + '.ejs'), `Relative Path: <%- relativePath %>\nAbsolute Path: <%- absolutePath %>`);

	easyEjsRenderer(inputDir, outputDir);

	const fileData = fs.readFileSync(path.join(outputDir, file + '.html'), 'utf8');

	expect(fileData).toBe(`Relative Path: \nAbsolute Path: /`);
});


test('Deep directory test', () => {
	const file = 'deep-directory-test';

	mkdirp.sync(path.join(inputDir, 'dir1', 'dir2'));

	fs.writeFileSync(path.join(inputDir, 'dir1', 'dir2', file + '.ejs'), `Relative Path: <%- relativePath %>\nAbsolute Path: <%- absolutePath %>`);

	easyEjsRenderer(inputDir, outputDir);

	const fileData = fs.readFileSync(path.join(outputDir, 'dir1', 'dir2', file + '.html'), 'utf8');

	expect(fileData).toBe(`Relative Path: ../../\nAbsolute Path: /dir1/dir2/`);
});

test('Data JSON test', () => {
	const data = {
		hoge: 'hove value',
		fuga: 'fuga value',
	};

	const dataJson = path.join(inputDir, 'data.json');
	const file = 'data-json-test';

	mkdirp.sync(inputDir);

	fs.writeFileSync(dataJson, JSON.stringify(data));
	fs.writeFileSync(path.join(inputDir, file + '.ejs'), `hoge: <%- hoge %>\nfuga: <%- fuga %>`);

	easyEjsRenderer(inputDir, outputDir, {
		dataJson: dataJson,
	});

	const fileData = fs.readFileSync(path.join(outputDir, file + '.html'), 'utf8');

	expect(fileData).toBe(`hoge: hove value\nfuga: fuga value`);
});