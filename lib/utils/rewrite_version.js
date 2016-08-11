const mapDir = require('../utils/map_dir');
const packageJson = require('../utils/package_json');
const currentPackage = packageJson();
const currentVersion = currentPackage.version;

const VERSION_PLACEHOLDER = '{-- VERSION_PLACEHOLDER --}';

module.exports = function(path) {
  mapDir(path, function(contents) {
    return contents.replace(VERSION_PLACEHOLDER, currentVersion);
  });
};
