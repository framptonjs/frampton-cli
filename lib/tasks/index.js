const Test = require('./test');
const Build = require('./build');
const Generate = require('./generate');
const Bump = require('./bump');

module.exports = {
  BuildTask : Build,
  TestTask : Test,
  GenerateTask : Generate,
  BumpTask : Bump
};
