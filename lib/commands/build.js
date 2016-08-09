const removeTests = require('../utils/remove_tests');
const BuildTask = require('../tasks').BuildTask;

const defaults = {
  outputPath : 'dist/'
};

function Build() {}

Build.prototype.run = function(flags) {
  const buildTask = new BuildTask();
  return buildTask.run(defaults).then(() => {
    removeTests(defaults.outputPath);
  });
};

module.exports = Build;
