const Builder = require('../models/builder');

function Build() {}

Build.prototype.run = function(options) {
  console.log('Building...');
  const builder = new Builder({
    outputPath: options.outputPath
  });
  return builder.build()
    .finally(() => {
      return builder.cleanup();
    })
    .then(() => {
      console.log(`Built project successfully. Stored in "${options.outputPath}".`);
    })
    .catch((err) => {
      console.log('Build failed.');
      throw err;
    });
};

Build.prototype.cleanup = function() {
  return this.builder.cleanup().catch((err) => {
    console.log('error: ', err);
  });
};

module.exports = Build;
