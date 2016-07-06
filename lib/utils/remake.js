const remove = require('./remove');
const fs = require('fs');

module.exports = function remake(path) {
  remove(path);
  fs.mkdirSync(path);
};