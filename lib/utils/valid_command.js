const whitelist =
  ['release', 'build', 'test', 'generate'];

module.exports = function valid_command(str) {
  const cmd = str.trim();
  if (whitelist.indexOf(cmd) === -1) {
    console.log(`The input command '${cmd}' is not supported by frampton`);
    console.log(`The suppored commands are: ${whitelist.join(', ')}`);
    process.exit(1);
  } else {
    return cmd;
  }
};
