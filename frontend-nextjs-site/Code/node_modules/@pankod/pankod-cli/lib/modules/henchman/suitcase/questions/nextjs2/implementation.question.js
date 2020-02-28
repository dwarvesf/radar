"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// #region Global Imports
const inquirer = require("inquirer");
// #endregion Local Imports
exports.implementation = {
    message: `What's your preferred implementation?`,
    name: 'implementation',
    type: 'list',
    default: 'functional',
    choices: [
        new inquirer.Separator(),
        {
            name: 'Functional',
            value: 'functional'
        },
        {
            name: 'Object Oriented',
            value: 'object-oriented'
        }
    ]
};
