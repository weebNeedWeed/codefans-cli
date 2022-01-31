const path = require("path");
const fs = require("fs");
const chalk = require("chalk");
const readConfigFile = require("../helpers/readConfigFile");
const { v4: uuidv4 } = require("uuid");

function createCommand(argv) {
	const currentWorkDir = process.cwd();

	const typeArg = argv._[1];

	switch (true) {
		case typeArg === "config": {
			const configFilePath = path.join(currentWorkDir, "cfcli.config.json");

			/**
			 * * If config file already existed, not create new file
			 */
			if (fs.existsSync(configFilePath)) {
				console.log(chalk.red("Error: configuration file already existed"));

				return;
			}

			const writeContent = {
				rootContentsDir: "",
			};

			fs.writeFile(
				configFilePath,
				JSON.stringify(writeContent, null, "\t"),
				(error) => {
					if (error) throw error;

					console.log(
						chalk.green(
							`Successfully created configuration file: ${configFilePath}`,
						),
					);
				},
			);

			break;
		}

		case typeArg === "post": {
			const configValue = readConfigFile();
			const newPostId = uuidv4();
			const newPostFilePath = path.join(
				configValue.rootContentsDir,
				`/posts/post${newPostId}.md`,
			);

			const postsDotJsonPath = path.join(
				configValue.rootContentsDir,
				"posts.json",
			);

			const createTime = Date.now();

			fs.open(postsDotJsonPath, "a+", (err) => {
				if (err) throw err;

				const fileData = JSON.parse(
					fs.readFileSync(postsDotJsonPath, {
						encoding: "utf-8",
					}) || "[]",
				);

				const newPost = {
					name: "",
					id: newPostId,
					slug: "",
					description: "",
					categoryId: "0",
					createdAt: createTime,
					imageUrl: "",
				};

				fileData.push(newPost);

				fs.writeFile(
					postsDotJsonPath,
					JSON.stringify(fileData, null, "\t"),
					(err) => {
						if (err) throw err;

						fs.writeFile(newPostFilePath, `# ${newPostId}`, (writeError) => {
							if (writeError) throw writeError;

							console.log(
								chalk.green(
									"Successfully created new post with id = " + newPostId,
								),
							);
						});
					},
				);
			});

			break;
		}
	}
}

module.exports = createCommand;
