const Test = require('./test');
const Build = require('./build');
const Generate = require('./generate');
const Release = require('./release');

module.exports = {
  TestCommand : Test,
  BuildCommand : Build,
  GenerateCommand : Generate,
  ReleaseCommand : Release
};
