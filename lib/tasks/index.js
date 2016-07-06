const Test = require('./test');
const Build = require('./build');
const Generate = require('./generate');

module.exports = {
  BuildTask : Build,
  TestTask : Test,
  GenerateTask : Generate
};