const TestTask = require('../tasks').TestTask;
const BuildTask = require('../tasks').BuildTask;
const remove = require('../utils/remove');
const path = require('path');
const quickTemp = require('quick-temp');
const copyFile = require('../utils/copy_file');
const wrench = require('wrench');

function Test() {}

Test.prototype.testsDir = 'testsDir';

Test.prototype.tmp = function() {
  return quickTemp.makeOrRemake(this, this.testsDir);
};

Test.prototype.setupTests = function(outputPath) {

  wrench.copyDirSyncRecursive('tests', path.join(outputPath, 'tests'));
  copyFile('./testem.json', path.join(outputPath, 'testem.json'));

  wrench.copyDirSyncRecursive(
    './node_modules/qunitjs/qunit',
    path.join(outputPath, 'qunit')
  );



  wrench.copyDirSyncRecursive(
    './node_modules/qunitjs/qunit',
    path.join(outputPath, 'qunit')
  );
};

Test.prototype.run = function() {

  const outputPath = this.tmp();
  const setupTests = this.setupTests;

  const options = {
    outputPath: outputPath
  };

  const test = new TestTask();
  const build = new BuildTask();

  return build.run(options)
    .then(() => {
      setupTests(outputPath);
      return test.run(options);
    })
    .finally(() => {
      remove(outputPath);
    })
    .catch((err) => {
      console.log('error: ', err);
    });
};

module.exports = Test;