#!/usr/bin/env node

var nopt    = require('nopt');
var powshen  = require('../lib');
var pkg     = require('../package.json');

// Custom options that can be passed to commands
var options = {
    "lambda-function": String
}

// Shorthands for the above commands
var shorthands = {
  "lam": "--lambda-function"
}

var parsed = nopt(options, shorthands);

// cmd.args contains basic commands like "mix" and "help"
// cmd.opts contains options, like --libsass and --version
var cmd = {
    args: parsed.argv.remain,
    opts: parsed
}

// If no arguments were given.
if (typeof cmd.args[0] === 'undefined') {
    // If the option --version was passed, show the version of the CLI.
    if (typeof cmd.opts.version !== 'undefined') {
        process.stdout.write("POWSHEN CLI VERSION " + pkg.version + '\n');
    } else {
        // Just show the default help message.
        powshen.help();
    }
} else {
    // If arguments are not found, they are not valid.
    if (typeof powshen[cmd.args[0]] == 'undefined') {
        powshen.help('not_found');
    } else {
        // Rub the first argument along with the options.
        powshen[cmd.args[0]](cmd.args.slice(1), cmd.opts);
    }
}