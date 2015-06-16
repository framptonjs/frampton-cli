var fs        = require('fs');

module.exports = function copyFile(inputFile, outputFile) {
  var contents = fs.readFileSync(inputFile);
  fs.openSync(outputFile, 'w');
  fs.writeFileSync(outputFile, contents);
};