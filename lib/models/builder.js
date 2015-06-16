var fs       = require('fs');
var path     = require('path');
var Promise  = require('../ext/promise');
var copy     = require('../utils/copy');
var remake   = require('../utils/remake');
var broccoli = require('broccoli');

function Builder(options) {
  this.tree       = broccoli.loadBrocfile();
  this.builder    = new broccoli.Builder(this.tree);
  this.outputPath = options.outputPath;
}

Builder.prototype.build = function() {
  var args = [];
  for (var i = 0, l = arguments.length; i < l; i++) {
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
  var self = this;
  return this.copyToOutputPath(results.directory)
    .then(function() {
      return results;
    });
};

Builder.prototype.copyToOutputPath = function(inputPath) {
  var outputPath = this.outputPath;
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