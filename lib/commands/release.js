const BuildTask = require('../tasks').BuildTask;
const BumpTask = require('../tasks').BumpTask;
const removeTests = require('../utils/remove_tests');
const exec = require('child_process').execSync;
const readline = require('readline');

const defaults = {
  outputPath : 'dist/',
  release : 'patch'
};

function Release() {}

Release.prototype.run = function(flags) {

  const buildTask = new BuildTask();

  return buildTask.run(defaults).then(() => {
    removeTests(defaults.outputPath);
    const bump = new BumpTask();
    const version = bump.run(flags);
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    const question =
      'Are you ready to release version: ' + version + ' (y/n)? ';

    rl.question(question, (res) => {

      switch(res) {
        case 'y':
        case 'yes':
          const command =
            'git add --all;' +
            'git commit -m "version bump v' + version + '";' +
            'git push -u origin master;' +
            'npm publish ./;';

          exec(command);

          console.log('Version: ' + version + ' released.');
          break;

        default:
          console.log('Release aborted');
      }

      rl.close();
    });
  });
};

module.exports = Release;
