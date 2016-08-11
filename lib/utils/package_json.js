const path = require('path');

module.exports = function() {
  return require(path.join(process.cwd(), './package.json'));
};
