#!/usr/bin/env node

// To enable KUE-DASHBOARD
var kue = require('kue');
var argv = require('yargs')
	.usage('Usage: $0 [options]')
	.example('$0 -p 3050 -r redis://10.0.0.4:6379 -q q')
	.describe('r', 'Redis url')
	.describe('p', 'Dashboard port')
	.describe('q', 'Prefix to use')
	.default('p', 3000)
	.default('r', 'redis://127.0.0.1:6379')
	.default('q', 'q')
	.help('h')
    .alias('h', 'help')
    .argv
;

kue.createQueue({
  redis: argv.r,
  prefix: argv.q
});


kue.app.listen(argv.p);
console.log("Running on http://127.0.0.1:" + argv.p);
