const fs = require('fs');
const path = require('path');
const packagePath = path.join(process.cwd(), './package.json');
const packageJson = require('../utils/package_json');
const currentPackage = packageJson();
const currentVersion = currentPackage.version.split('.').map((next) => {
  return parseInt(next);
});

const defaults = {
  outputPath : 'dist/'
};

function Bump() {}

Bump.prototype.run = function(options) {
  switch (options.release) {

    case 'major':
      currentVersion[0] = currentVersion[0] + 1;
      currentVersion[1] = 0;
      currentVersion[2] = 0;
      break;

    case 'minor':
      currentVersion[1] = currentVersion[1] + 1;
      currentVersion[2] = 0;
      break;

    default:
      currentVersion[2] = currentVersion[2] + 1;
  }

  const versionString = currentVersion.join('.');
  currentPackage.version = versionString;

  const packageContents = JSON.stringify(currentPackage, null, 2);
  const writeOptions = { flag : 'w' };
  fs.writeFileSync(packagePath, packageContents, writeOptions);

  return versionString;
};

module.exports = Bump;
