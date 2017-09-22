"use strict";

const fs = require("fs");
const colors = require("colors/safe");
const Helper = require("../helper");
const themes = require("./themes");

const that = this;
const customCss = [];

module.exports = that;

const packageApi = function(packageName) {
	return {
		addCustomCss: that.addCustomCss.bind(this, packageName)
	};
};

that.addCustomCss = function(packageName, filename) {
	customCss.push(packageName + "/" + filename);
};

that.getCustomCss = function() {
	return customCss;
};

that.loadPackages = function() {
	fs.readdir(Helper.getPackagesPath(), (err, packages) => {
		if (err) {
			return;
		}
		packages
			.forEach((packageName) => {
				const packageFile = getModuleInfo(packageName);
				if (packageFile.type === "theme") {
					themes.addtheme(packageName, packageFile);
				} else if (packageFile.type === "package") {
					packageFile.run(packageApi(packageName));
				}
			});
	});
};

function getModuleInfo(packageName) {
	let module;
	try {
		module = require(Helper.getPackageModulePath(packageName));
	} catch (e) {
		log.warn(`Specified package ${colors.yellow(packageName)} is not installed in packages directory`);
		return;
	}
	if (!module.lounge) {
		log.warn(`Specified package ${colors.yellow(packageName)} doesn't have required information.`);
		return;
	}
	return module.lounge;
}
