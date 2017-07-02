var fs = require('fs');
var path = require('path');

module.exports = function(options) {

    var questions = [];

    questions.push({
        type: 'input',
        name: 'directory',
        message: 'Name your mix (no spaces)',
        validate: function(input) {
            var folder = path.join(process.cwd(), input);
            if (fs.existsSync(folder)) {
                return 'There\'s already a mix with that name in this directory.';
            }
            if (input.indexOf(" ") != -1) {
                return "The mix name should not contain any spaces.";
            }
            return true;
        },

        when: function () {
            if (!options.directory)
            return true;
        }
    });

    questions.push({
        type: 'list',
        name: 'mix',
        message: 'What would you like to mix?',
        default: 'serverless',
        choices: [
            {
                name: 'A serverless project',
                value: 'serverless'
            }
        ],
        when: function () {
            if (!options.mix || !options.mix.match(/^(serverless)s?$/i))
            return true;
        }
    });

    return questions;
}
