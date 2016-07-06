'use strict';

const path = require('path');
const readline = require('readline');
const GenerateTask = require('../tasks').GenerateTask;

function Generate() {}

Generate.prototype.run = function() {
  const blueprintTask = new GenerateTask();
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('What is the path of your new module? ', (path) => {

    rl.question('Would you like to start with any Actions? ', (actions) => {

      blueprintTask.run({
        path : path,
        actions : (
          actions
            .split(',')
            .map((val) => val.trim())
            .filter((val) => val !== '')
        )
      });

      console.log('Module created at:' + path);

      rl.close();
    });
  });
};

module.exports = Generate;
