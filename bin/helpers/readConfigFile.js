const path = require("path");
const fs = require("fs");
const chalk = require("chalk");

function readConfigFile() {
	const currentWorkDir = process.cwd();
	const configFilePath = path.join(currentWorkDir, "cfcli.config.json");

	let configFileValue;

	try {
		configFileValue = JSON.parse(
			fs.readFileSync(configFilePath, { encoding: "utf8" }),
		);
	} catch (error) {
		console.log(
			chalk.yellow(
				"Configuration file not found, we will use default value instead",
			),
		);
	}
	const defaultValue = {
		rootContentsDir: "/src/assets/contents",
	};

	return {
		rootContentsDir: path.join(
			currentWorkDir,
			configFileValue?.rootContentsDir ?? defaultValue.rootContentsDir,
		),
	};
}

module.exports = readConfigFile;
