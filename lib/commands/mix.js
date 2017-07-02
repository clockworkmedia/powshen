var util     = require('../util');
var which    = require('which');
var inquirer = require('inquirer');
var isRoot   = require('is-root');
var async    = require('async');
var path     = require('path');
var format   = require('util').format;
var exec     = require('child_process').exec;

var repositories = {
    serverless: 'git@github.com:clockworkmedia/serverless-post-to-mysql.git'
}

// 1. Check that the process isn't root, and that Git is installed.
// 2. Find out what the user wants to do.
// 3. Clone the mix's template project.



module.exports = function(args, options, callback, ee) {

    var projectName, projectFolder, mix, messages, directory;

    // List of tasks to execute in order.
    var tasks = [
        inspect, prompt, gitClone
    ];

    // Execute these functions in order.
    async.series(tasks, finish);

    // 1. Check that the process isn't root, and that Git is installed.
    function inspect(cb) {
        console.log('Running mix...');
        if (isRoot()) {
            console.log(util.messages.noRoot);
            process.exit(1);
        }
        which('git', function(error) {
            if (error) {
                console.log(util.messages.gitMissing);
                process.exit(69);
            }
            cb();
        });
    }

    // 2. Find out what the user wants to do.
    function prompt(cb) {
        inquirer.prompt(util.questions(options), function(answers) {
            // The variables we need either came from the prompts, or the console arguments.
            projectName = answers.directory || options.directory;
            mix = answers.mix || options.mix;
            projectFolder = path.join(process.cwd(), projectName);
            messages = util.messages(projectName,mix);
            cb();
        });
    }

    // 3. Clone the mix's template project
    function gitClone(cb) {
        var repo = repositories[mix];

        var cmd = format('git clone %s %s', repo, projectName);

        if (repositories[mix] === undefined) {
            console.log("error!".red + "\nMix " + mix.cyan + " unknown.");
            process.exit(1);
        }

        exec(cmd, function(err) {
            if (err instanceof Error) {
                console.log(messages.gitCloneError);
                process.exit(1);
            }
            process.chdir(projectFolder);
            cb();
        });

        if (typeof(ee) !== 'undefined') {
            ee.emit("cloneSuccess", projectName);
        }
    }

    function finish(err, results) {
        console.log(messages.gitCloneSuccess);
    }
}