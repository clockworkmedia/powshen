var colors = require('colors');

module.exports = function(projectName,messageMix,messageTemplate) {
    return {
        // Some messages
        gitCloneError: "Encountered issue running " + "git clone ".cyan + ".\nMake sure your computer's Git is configured properly then try again.",
        gitCloneSuccess: " \u2713 Your mix is ready.".green,
    }
}

module.exports.test = function(message) {
    return message;
};

module.exports.noRoot = [
  'Warning'.yellow,
  '------------------------',
  'Running this installer as an administrator can cause problems.',
  'We sure hope you know what you\'re doing...'
];

module.exports.gitMissing = "\nYou need GIT to run Powshen. Download it : " + "http://git-scm.com/downloads".yellow + "\n";
