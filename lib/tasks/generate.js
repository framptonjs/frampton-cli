const path = require('path');
const fs = require('fs');
const mkfile = require('../utils/mkfile');

const blueprintPath = path.join(__dirname, '../../blueprints/module.js');
const actionPlaceholder = '{-- ACTION_PLACEHOLDER --}';
const updatePlaceholder = '{-- UPDATE_PLACEHOLDER --}';

function makeAction(action) {
  return action + ' : []';
}

function makeUpate(action) {
  return (
    action + ' : () => {\n' +
    '      return [newState, newTask];\n' +
    '    }'
  );
}

function Generate() {}

Generate.prototype.run = function(options) {
  const moduleBlueprint = fs.readFileSync(blueprintPath, 'utf8');
  const actions = options.actions.reduce((acc, next) => {
    if (acc === '') {
      return makeAction(next);
    } else {
      return acc + ',\n  ' + makeAction(next);
    }
  }, '');

  const updates = options.actions.reduce((acc, next) => {
    if (acc === '') {
      return makeUpate(next);
    } else {
      return acc + ',\n\n    ' + makeUpate(next);
    }
  }, '');

  console.log('moduleBlueprint: ', moduleBlueprint);

  const moduleContent = moduleBlueprint
    .replace(actionPlaceholder, actions)
    .replace(updatePlaceholder, updates);

  console.log('moduleContent: ', moduleContent);

  mkfile(options.path, moduleContent);
};

module.exports = Generate;