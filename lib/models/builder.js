const fs       = require('fs');
const path     = require('path');
const Promise  = require('../ext/promise');
const copy     = require('../utils/copy');
const remake   = require('../utils/remake');
const broccoli = require('broccoli');

function Builder(options) {
  this.tree       = broccoli.loadBrocfile();
  this.builder    = new broccoli.Builder(this.tree);
  this.outputPath = options.outputPath;
}

Builder.prototype.build = function() {
  const args = [];
  for (var i = 0; i < arguments.length; i++) {
    args.push(arguments[i]);
  }
  return this.builder.build.apply(this.builder, args)
    .then(this.processBuildResult.bind(this))
    .catch(function(error) {
      console.log('build error: ' + error);
      throw error;
    }.bind(this));
};

Builder.prototype.processBuildResult = function(results) {
  const self = this;
  return this.copyToOutputPath(results.directory)
    .then(function() {
      return results;
    });
};

Builder.prototype.copyToOutputPath = function(inputPath) {
  const outputPath = this.outputPath;
  return new Promise(function(resolve) {
    remake(outputPath);
    return resolve(copy(inputPath, outputPath));
  });
};

Builder.prototype.cleanup = function() {
  return this.builder.cleanup().catch(function(err) {
    console.log('cleanup error: ', err);
  });
};

module.exports = Builder;