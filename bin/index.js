#! /usr/bin/env node
const parseArgs = require("minimist");

const argv = parseArgs(process.argv.slice(2));

const mainCommand = argv._[0];

switch (true) {
	case mainCommand === "create": {
		require("./commands/create")(argv);
		break;
	}
}
