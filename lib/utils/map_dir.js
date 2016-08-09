const fs = require('fs');
const path = require('path');

module.exports = function map_dir(dir, fn) {
  if (fs.existsSync(dir)) {
    fs.readdirSync(dir).forEach((file, index) => {
      const currentPath = path.join(dir, file);
      if (fs.lstatSync(currentPath).isFile()) {
        const contents = fs.readFileSync(currentPath, 'utf8');
        const newContents = fn(contents);
        const options = { flag : 'w' };
        fs.writeFileSync(currentPath, newContents, options);
      }
    });
  }
};
