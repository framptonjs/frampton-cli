const BuildTask = require('../tasks').BuildTask;
const BumpTask = require('../tasks').BumpTask;
const removeTests = require('../utils/remove_tests');
const rewriteVersion = require('../utils/rewrite_version');
const merge = require('../utils/merge');

const exec = require('child_process').execSync;
const readline = require('readline');

const defaults = {
  outputPath : 'dist/',
  release : 'patch'
};

function Release() {}

Release.prototype.run = function(options) {

  const mergedOpts = merge(defaults, options);
  const buildTask = new BuildTask();

  return buildTask.run(mergedOpts).then(() => {
    const bump = new BumpTask();
    const version = bump.run(mergedOpts);
    removeTests(mergedOpts.outputPath);
    rewriteVersion(mergedOpts.outputPath);

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

          try {
            exec(command);
            console.log('Version: ' + version + ' released.');
          } catch(e) {
            console.log('An error occurred trying to perform this release');
          }

          break;

        default:
          console.log('Release aborted');
      }

      rl.close();
    });
  });
};

module.exports = Release;
