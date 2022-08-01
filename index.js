// #!/usr/bin/env node

import yargs from 'yargs';
import chalk from 'chalk';

import { hideBin } from 'yargs/helpers';

import { getEnv } from './src/requests.js';

const cli = yargs(hideBin(process.argv))
	.command('get')
	.demandCommand()
	.usage('Usage: pocket-nano get --name=<envName> --key=<apiKey>')
	.option('name', {
		alias: 'n',
		describe: 'Name of the env file',
	})
	.option('key', {
		alias: 'k',
		describe: 'Your PocketEnv API key',
	})
	.option('download', {
		alias: 'd',
		describe: 'Download the file',
	})
	.option('saveAs', {
		alias: 's',
		describe: 'Save file under custom name',
	})
	.demandOption(['name', 'key'])
	.help('h')
	.alias('h', 'help')
	.alias('v', 'version')
	.epilog('Copyright 2022 PocketEnv').argv;

if (!cli.name || !cli.key) {
	console.log(chalk.red('All fields are required'));
} else {
	getEnv(cli);
}
