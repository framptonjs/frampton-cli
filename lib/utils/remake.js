var remove = require('./remove');
var fs     = require('fs');

module.exports = function remake(path) {
  remove(path);
  fs.mkdirSync(path);
};