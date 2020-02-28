"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// #region Global Imports
const inquirer = require("inquirer");
// #endregion Local Imports
exports.customPath = {
    message: 'Do you want to add custom route or use default route name?',
    name: 'hasPath',
    type: 'list',
    default: false,
    choices: [
        new inquirer.Separator(),
        {
            name: 'Yes, I want to add custom path?',
            value: true
        },
        {
            name: 'No, use default.',
            value: false
        }
    ]
};
exports.enterRouteName = {
    message: 'Enter route name',
    name: 'routePath',
    type: 'input',
    when: ({ hasPath = false }) => hasPath
};
