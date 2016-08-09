const parseFlags = require('./parse_flags');

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
      default:
        newOpts[key] = opts[key];
    }
  }

  return newOpts;
}
