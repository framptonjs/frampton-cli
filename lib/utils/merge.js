module.exports = function() {
  const target = {};
  const sources = [].slice.call(arguments, 0);
  sources.forEach(function(source) {
    for (var prop in source) {
      target[prop] = source[prop];
    }
  });
  return target;
}
