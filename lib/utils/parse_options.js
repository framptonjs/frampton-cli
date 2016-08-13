const parseFlags = require('./parse_flags');

function parseKey(key) {
  const temp = key.replace('--', '');
  switch (temp) {
    case 'o':
    case 'output':
      return 'outputPath';

    default:
      return temp;
  }
}

module.exports = function parse_options(args) {
  const opts = parseFlags(args);
  const newOpts = { release : 'patch' };

  for (var key in opts) {
    switch (key) {

      case 'major':
        newOpts.release = 'major';
        break;

      case 'minor':
        newOpts.release = 'minor';
        break;

      case 'patch':
        newOpts.release = 'patch';
        break;

      case 'o':
      case 'output':
        newOpts.outputPath = opts[key];
        break;

      default:
        newOpts[key] = opts[key];
    }
  }

  return newOpts;
}
