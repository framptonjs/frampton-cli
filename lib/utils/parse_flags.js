function startsWith(sub, str) {
  return (str.indexOf(sub) === 0);
}

/**
 * @name parseFlags
 * @param {Array} args
 * @returns {Object}
 */
module.exports = function parse_flags(args) {
  const opts = {};
  const len = args.length;
  var prev = null;
  var next = null;

  for (var i = 0; i < len; i++) {
    next = args[i];
    if (startsWith('--', next)) {
      if (prev !== null) {
        opts[prev] = true;
      }
      prev = next.replace('--', '');
    } else {
      if (prev !== null) {
        opts[prev] = next;
        prev = null;
      } else {
        throw new Error(`Value '${next}' did not have an associated flag`);
      }
    }
  }

  if (prev) {
    opts[prev] = true;
    prev = null;
  }

  return opts;
};
