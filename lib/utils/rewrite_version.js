const mapDir = require('../utils/map_dir');
const packageJson = require('../utils/package_json');

const VERSION_PLACEHOLDER = '{-- VERSION_PLACEHOLDER --}';

module.exports = function rewrite_version(path) {
  const currentPackage = packageJson();
  const currentVersion = currentPackage.version;
  mapDir(path, function(contents) {
    return contents.replace(VERSION_PLACEHOLDER, currentVersion);
  });
};
