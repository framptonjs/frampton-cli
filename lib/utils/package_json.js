const path = require('path');
const packageJson = require(path.join(process.cwd(), './package.json'));

module.exports = packageJson;
