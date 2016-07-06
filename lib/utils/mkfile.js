const fs = require('fs');
const path = require('path');

function exists(path) {
  try {
    const stats = fs.lstatSync(path);
    return stats.isDirectory();
  } catch(e) {
    return false;
  }
}

function createPath(parts, soFar) {

  const currentPath = path.join(soFar, parts[0]);

  if (!exists(currentPath)) {
    fs.mkdirSync(currentPath);
  }

  if (parts.length > 1) {
    createPath(parts.slice(1), currentPath);
  }
}

function mkdir(file, content) {
  const parts = file.split(path.sep).filter((val) => {
    return val !== '';
  });

  const len = parts.length;
  const fileName = parts[len - 1];
  const dirs = parts.splice(0, len - 1);

  if (dirs.length > 0) {
    createPath(dirs, '.');
  }
  fs.writeFileSync(file, content);
}

module.exports = mkdir;