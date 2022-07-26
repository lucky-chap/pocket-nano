// #!/usr/bin/env node

import fetch from 'node-fetch';

import yargs from 'yargs';

import { hideBin } from 'yargs/helpers';

const argv = yargs(hideBin(process.argv))
	.command('get')
	.demandCommand()
	.usage('Usage: pocket-nano get --name=<env name> --key=<api key>')
	.demandOption(['name', 'key'])
	.alias('n', 'name')
	.alias('k', 'key')
	.describe('name', 'Name of the env file')
	.describe('key', 'Your PocketEnv API key')
	.help('h')
	.alias('h', 'help')
	.alias('v', 'version')
	.epilog('Copyright 2022 PocketEnv').argv;

if (!argv.name || !argv.key) {
	console.log('All fields are required');
} else {
	const fetcherPost = async () => {
		const body = {
			name: argv.name,
			key: argv.key,
		};
		await fetch('http://localhost:3000/api/cli', {
			method: 'POST',
			body: JSON.stringify(body),
		})
			.then((res) => res.json())
			.then((data) => console.log(data));
	};

	fetcherPost();
}
