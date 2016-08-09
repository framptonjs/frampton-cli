const fs = require('fs');
const path = require('path');
const mapDir = require('../utils/map_dir');
const packagePath = path.join(process.cwd(), './package.json');
const packageJson = require('../utils/package_json');
const currentVersion = packageJson.version.split('.').map((next) => {
  return parseInt(next);
});
const versionPlaceholder = '{-- VERSION_PLACEHOLDER --}';

const defaults = {
  outputPath : 'dist/'
};

function Bump() {}

Bump.prototype.run = function(options) {
  switch (options.release) {
    case 'major':
      currentVersion[0] = currentVersion[0] + 1;
      break;
    case 'minor':
      currentVersion[1] = currentVersion[1] + 1;
      break;
    default:
      currentVersion[2] = currentVersion[2] + 1;
  }

  const versionString = currentVersion.join('.');
  packageJson.version = versionString;
  const packageContents = JSON.stringify(packageJson, null, 2);
  const writeOptions = { flag : 'w' };
  fs.writeFileSync(packagePath, packageContents, writeOptions);

  mapDir(defaults.outputPath, function(contents) {
    return contents.replace(versionPlaceholder, versionString);
  });

  return versionString;
};

module.exports = Bump;
