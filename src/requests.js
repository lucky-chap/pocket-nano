import fetch from 'node-fetch';
import ora from 'ora';
import chalk from 'chalk';
import { download } from './utils.js';

const spinner = ora(chalk.yellow.italic('Getting env variables...'));

export const getEnv = async (cli) => {
	spinner.start();
	spinner.info();
	const body = {
		name: cli.name,
		key: cli.key,
	};
	await fetch('https://pocketenv.vercel.app/api/cli', {
		method: 'POST',
		body: JSON.stringify(body),
	})
		.then((res) => {
			if (!res.ok) {
				spinner.text = chalk.red.bold.italic('Request failed...\n');
				spinner.fail();
				res.json().then((err) => {
					console.log(chalk.red.bold.italic(err.message));
				});
			} else {
				spinner.text = chalk.green.bold.italic('Request completed...\n');
				spinner.succeed();
				spinner.clear();
				return res.json();
			}
		})
		.then((data) => {
			if (data == undefined) {
				return;
			} else {
				// console.log(data);
				if (cli.download && !cli.saveAs) {
					download(`${cli.name}.env`, data.fields);
				} else if (cli.download && cli.saveAs) {
					download(cli.saveAs.toString(), data.fields);
				}
				return data;
			}
		})
		.catch((_) => {
			spinner.text = chalk.red.bold.italic('Internal Server error...');
			spinner.fail();
		});
};
