"use strict";

global.log = {
	error: (...args) => console.error(...args), // eslint-disable-line no-console
	warn: () => {},
	info: () => {},
	debug: () => {},
};

var home = require("path").join(__dirname, ".lounge");
require("../../src/helper").setHome(home);
