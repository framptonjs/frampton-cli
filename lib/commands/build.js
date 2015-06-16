'use strict';

var path      = require('path');
var BuildTask = require('../tasks').BuildTask;

function Build() {}

Build.prototype.name = 'build';

Build.prototype.description = 'Builds your app and places it into the output path (dist/ by default).';

Build.prototype.availableOptions = [
  { name: 'environment', type: String, default: 'development' },
  { name: 'output-path', type: path, default: 'dist/' },
  { name: 'watch', type: Boolean, default: false },
  { name: 'watcher', type: String }
];

Build.prototype.run = function(commandOptions) {
  var buildTask = new BuildTask();
  return buildTask.run({
    outputPath : 'dist/'
  });
};

module.exports = Build;
