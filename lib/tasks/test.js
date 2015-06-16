var Testem  = require('testem');
var Promise = require('../ext/promise');

function Test() {
  this.testem = new Testem();
}

Test.prototype.testemOptions = function(options) {
  return {
    file: './testem.json',
    cwd: options.outputPath,
    host: 'localhost',
    port: 8080,
    fail_on_zero_tests: true,
    phantomjs_debug_port: 9000
  };
};

Test.prototype.run = function(options) {
  var testem = this.testem;
  return new Promise(function(resolve, reject) {
    testem.startCI(this.testemOptions(options), function(exitCode) {
      if (!testem.app.reporter.total) {
        reject('No tests were run.');
      }
      resolve(exitCode);
    });
  }.bind(this));
};

module.exports = Test;