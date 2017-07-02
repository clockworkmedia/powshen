var colors = require('colors');
var pkg     = require('../../package.json');

var helper = {
    'default': [
        'About Powshen:'.cyan ,
        '',
        '   About Powshen:'.yellow + ' ' + pkg.description,
        '',
        '   Version:'.yellow + ' ' + pkg.version,
        '',
        '   License:'.yellow + ' ' + pkg.license
    ],
    'mix': [
        'Usage:'.cyan,
        '',
        'The ' + 'mix'.yellow + ' command tries to walk you through your project setup.',
        'Run the command without any --flags to get an interactive setup prompt.',
        'Seasoned developers may want to checkout ' + 'powshen make'.yellow,
        '',
        '  powshen mix',
        '',
        'You may also run ' + 'powshen mix'.yellow + ' with --flags if you already know what to make.',
        '',
        '  powshen mix --lambda-function',
        '',
        'Good luck!'
    ],
    'not_found': [
        'Ooops!'.yellow,
        '',
        '   Looks like the command was not found.',
        '   Common mistakes are usually spelling mistakes.',
        '',
        'See ' + 'powshen help'.yellow + ' for more information.'
    ]
}

module.exports = function(args, options) {

    var say;
    // If the command has no args. Tell us about Powshen.
    if (typeof args === 'undefined' || args.length === 0) {
        // The default Powshen command.
        say = 'default'
    } else {
        // If the first argument is undefined.
        if(typeof helper[args[0]] === 'undefined') {
            say = 'not_found'
        } else {
            say = args[0]
        }
    }

    say = '\n' + helper[say].join('\n') + '\n\n'

    process.stdout.write(say);
}
