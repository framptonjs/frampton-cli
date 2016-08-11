const removeTests = require('../utils/remove_tests');
const rewriteVersion = require('../utils/rewrite_version');
const merge = require('../utils/merge');
const BuildTask = require('../tasks').BuildTask;

const defaults = {
  outputPath : 'dist/'
};

function Build() {}

Build.prototype.run = function(options) {
  const mergedOpts = merge(defaults, options);
  const buildTask = new BuildTask();
  return buildTask.run(mergedOpts).then(() => {
    removeTests(mergedOpts.outputPath);
    rewriteVersion(mergedOpts.outputPath);
  });
};

module.exports = Build;
