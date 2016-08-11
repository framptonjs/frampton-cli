const fs = require('fs');
const path = require('path');
const packageJson = require('../utils/package_json');
const currentPacakge = packageJson();

module.exports = function remove_tests(outputPath) {
  const name = currentPacakge.name;
  const testFile = path.join(process.cwd(), outputPath, `${name}-tests.js`);
  fs.unlinkSync(testFile);
};
