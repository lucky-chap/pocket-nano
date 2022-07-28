import fetch from 'node-fetch';
import ora from 'ora';
import chalk from 'chalk';

const spinner = ora(chalk.yellow.italic('Getting env variables...'));

export const getEnv = async (cli) => {
	spinner.start();
	spinner.info();
	const body = {
		name: cli.name,
		key: cli.key,
	};
	await fetch('http://localhost:3000/api/cli', {
		method: 'POST',
		body: JSON.stringify(body),
	})
		.then((res) => {
			if (!res.ok) {
				spinner.text = chalk.red.bold.italic('Request failed...\n');
				spinner.fail();
				console.log(chalk.red.italic('Check API key or Env name'));
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
				console.log(data);
			}
		})
		.catch((_) => {
			spinner.text = chalk.red.bold.italic('Internal Server error...');
			spinner.fail();
		});
};
