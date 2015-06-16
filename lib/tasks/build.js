var Builder = require('../models/builder');

function Build() {}

Build.prototype.run = function(options) {
  var builder = new Builder({
    outputPath: options.outputPath
  });
  return builder.build()
    .then(function(results) {
      var totalTime = results.totalTime / 1e6;
    })
    .finally(function() {
      return builder.cleanup();
    })
    .then(function() {
      console.log('Built project successfully. Stored in "' + options.outputPath + '".');
    })
    .catch(function(err) {
      console.log('Build failed.');
      throw err;
    });
};

Build.prototype.cleanup = function() {
  return this.builder.cleanup().catch(function(err) {
    console.log('error: ', err);
  });
};

module.exports = Build;