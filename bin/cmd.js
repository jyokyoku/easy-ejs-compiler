#!/usr/bin/env node

let mode = '';
let skip = false;

let inputDir;
let outputDir;
let pattern;
let ignorePattern;
let dataJson;
let optionsJson;

const usage = () => `
usage: easy-ejs-compiler INPUT_DIR {OPTIONS}

  Easily generate html files from EJS templates.

OPTIONS are:

  -o --output   The output directory for rendered files.
  -d --data     The "data" arguments of EJS renderer. (file path or JSON strings)
  -O --options  The "options" arguments of EJS renderer. ( file path or JSON strings)
  -v --version  Print the easy-ejs-renderer version number
`;

process.argv.slice(2).filter((arg) => {
	if (arg === '-v' || arg === '--version') {
		console.log(require('../package.json').version);
		process.exit(0);

	} else if (arg === '-h' || arg === '--help') {
		console.log(usage());
		process.exit(0);

	} else if (arg === '--output' || arg === '-o') {
		mode = 'output';
		skip = false;

	} else if (arg === '--pattern' || arg === '-p') {
		mode = 'pattern';
		skip = false;

	} else if (arg === '--data' || arg === '-d') {
		mode = 'data';
		skip = false;

	} else if (arg === '--options' || arg === '-O') {
		mode = 'options';
		skip = false;

	} else if (arg.match(/^-/)) {
		skip = true;

	} else if (skip) {
		return false;

	} else if (mode === 'output') {
		outputDir = arg;

	} else if (mode === 'pattern') {
		pattern = arg;

	} else if (mode === 'data') {
		dataJson = arg;

	} else if (mode === 'options') {
		optionsJson = arg;

	} else {
		inputDir = arg;
	}
});

if (!inputDir) {
	console.log(usage());
	process.exit(0);
}

try {
	require('../')(inputDir, outputDir, {
		pattern: pattern,
		ignorePattern: ignorePattern,
		dataJson: dataJson,
		optionsJson: optionsJson,
	});

} catch (e) {
	console.error(e);
	process.exit(1);
}