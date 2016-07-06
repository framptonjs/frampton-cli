const Promise = require('../ext/promise');
const fs = require('fs');
const path = require('path');

function copy(source, target) {

  return new Promise(function(resolve, reject) {

    fs.readdir(source, function(err, list) {
      if (err) { reject(err); }
      list.forEach(function(file) {
        const inputPath = path.join(source, file);
        const outputPath = path.join(target, file);
        const contents = fs.readFileSync(inputPath);
        fs.openSync(outputPath, 'w');
        fs.writeFileSync(outputPath, contents);
      });
      resolve();
    });
  });
}

module.exports = copy;