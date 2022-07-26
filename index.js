#!/usr/bin/env node

import { Command } from 'commander';

const cli = new Command();

cli
	.name('PocketEnv CLI')
	.description(
		'Official CLI for using PocketEnv (https://pocket-env.vercel.app)'
	)
	.version('0.0.1');

cli
	.command('get')
	.description('Initialize the CLI to connect to the API')
	.option(
		'--name, -n <envName>',
		'The API key on your profile page on PocketEnv'
	)
	.option('--key, -k <apiKey>', 'The API key on your profile page on PocketEnv')
	.action((data, options) => {
		console.log(data);
		// console.log(options);
	});

cli.parse();
