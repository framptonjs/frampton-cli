const fs = require('fs');
const path = require('path');
const packageJson = require('../utils/package_json');

module.exports = function remove_tests(outputPath) {
  const name = packageJson.name;
  const testFile = path.join(process.cwd(), outputPath, `${name}-tests.js`);
  fs.unlinkSync(testFile);
};
