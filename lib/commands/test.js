var TestTask  = require('../tasks').TestTask;
var BuildTask = require('../tasks').BuildTask;
var remove    = require('../utils/remove');
var path      = require('path');
var quickTemp = require('quick-temp');
var copyFile  = require('../utils/copy_file');
var wrench      = require('wrench');

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
};

Test.prototype.run = function() {

  var outputPath = this.tmp();
  var setupTests = this.setupTests;

  var options = {
    outputPath: outputPath
  };

  var test  = new TestTask();
  var build = new BuildTask();

  return build.run(options)
    .then(function() {
      setupTests(outputPath);
      return test.run(options);
    })
    .finally(function() {
      remove(outputPath);
    })
    .catch(function(err) {
      console.log('error: ', err);
    });
};

module.exports = Test;