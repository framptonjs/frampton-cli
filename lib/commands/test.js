const TestTask = require('../tasks').TestTask;
const BuildTask = require('../tasks').BuildTask;
const remove = require('../utils/remove');
const path = require('path');
const quickTemp = require('quick-temp');
const copyFile = require('../utils/copy_file');
const extra = require('fs-extra');
const fs = require('fs');
const mkfile = require('../utils/mkfile');

const framptonPlaceholder = '{-- FRAMPTON --}';
const projectPlaceholder = '{-- PROJECT_FILES --}';
const htmlBlueprintPath = path.join(__dirname, '../../blueprints/test.html');
const testemBlueprintPath = path.join(__dirname, '../../blueprints/testem.js');

const blacklist = [
  'frampton-cli',
  'frampton-build'
];

function isFrampton(dep) {
  return (dep.indexOf('frampton') !== -1);
}

function makeProjectImports(name) {
  return (
    `<script src="./${name}.js"></script>\n` +
    `  <script src="./${name}-tests.js"></script>`
  );
}

function makeImport(dep) {
  return `<script src="./${dep}.js"></script>`;
}

function Test() {}

Test.prototype.testsDir = 'testsDir';

Test.prototype.tmp = function() {
  return quickTemp.makeOrRemake(this, this.testsDir);
};

Test.prototype.setupTests = function(outputPath) {

  const htmlBlueprint = fs.readFileSync(htmlBlueprintPath, 'utf8');
  const testemBlueprint = fs.readFileSync(testemBlueprintPath, 'utf8');
  const cliNodeModules = path.join(__dirname, '../../node_modules');
  const projectNodeModules = path.join(process.cwd(), './node_modules');
  const packageJson = require(path.join(process.cwd(), './package.json'));
  const packageName = packageJson.name;
  const dependencies = Object.keys(packageJson.dependencies || {});
  const framptonDeps = dependencies.filter(isFrampton);

  copyFile('./testem.json', path.join(outputPath, 'testem.json'));

  extra.copySync(
    path.join(cliNodeModules, '/qunitjs/qunit'),
    path.join(outputPath, 'qunit')
  );

  framptonDeps.forEach((dep) => {
    extra.copySync(
      path.join(projectNodeModules, `/${dep}/dist/${dep}.js`),
      path.join(outputPath, `${dep}.js`)
    );
  });

  const framptonImports = framptonDeps.reduce((acc, next) => {
    if (acc === '') {
      return makeImport(next);
    } else {
      return acc + '\n' + makeImport(next);
    }
  }, '');

  const projectFiles = makeProjectImports(packageName);

  const htmlContent = htmlBlueprint
    .replace(framptonPlaceholder, framptonImports)
    .replace(projectPlaceholder, projectFiles);

  mkfile(path.join(outputPath, 'index.html'), htmlContent);
  mkfile(path.join(outputPath, 'testem.js'), testemBlueprint);
};

Test.prototype.run = function(flags) {

  const outputPath = this.tmp();
  const setupTests = this.setupTests;

  const options = {
    outputPath: outputPath
  };

  const test = new TestTask();
  const build = new BuildTask();

  return build.run(options)
    .then(() => {
      setupTests(outputPath);
      return test.run(options);
    })
    .finally(() => {
      remove(outputPath);
    })
    .catch((err) => {
      console.log('Error running tests: ', err);
      process.exit(1);
    });
};

module.exports = Test;
