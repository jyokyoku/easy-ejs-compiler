# easy-ejs-compiler
[![npm version](https://badge.fury.io/js/easy-ejs-compiler.svg)](https://badge.fury.io/js/easy-ejs-compiler)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Easily generate html files from EJS templates.

## Installation

Use NPM:
```shell script
$ npm i easy-ejs-compiler
```

Use Yarn:
```shell script
$ yarn add easy-ejs-compiler
```

## Usage

```shell script
$ easy-ejs-compiler INPUT_DIR {OPTIONS}
```

Options:
```shell script
-o --output   The output directory for rendered files.
-d --data     The "data" arguments of EJS renderer. (file path or JSON strings)
-O --options  The "options" arguments of EJS renderer. ( file path or JSON strings)
-v --version  Print the easy-ejs-renderer version number
```

## Notice

If you do not set the `--output` option, the results will be output to the console.