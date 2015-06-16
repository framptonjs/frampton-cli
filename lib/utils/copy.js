var Promise = require('../ext/promise');
var fs      = require('fs');
var path    = require('path');

function copy(source, target) {

  return new Promise(function(resolve, reject) {

    fs.readdir(source, function(err, list) {
      if (err) { reject(err); }
      list.forEach(function(file) {
        var inputPath = path.join(source, file);
        var outputPath = path.join(target, file);
        var contents = fs.readFileSync(inputPath);
        fs.openSync(outputPath, 'w');
        fs.writeFileSync(outputPath, contents);
      });
      resolve();
    });
  });
}

module.exports = copy;