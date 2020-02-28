"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// #region Global Imports
const inquirer = require("inquirer");
// #endregion Local Imports
exports.addStyle = {
    message: 'What kind of css do you want to implement?',
    name: 'hasStyle',
    type: 'list',
    default: false,
    choices: [
        new inquirer.Separator(),
        {
            name: 'styled-components',
            value: 'styled'
        },
        {
            name: 'SCSS/SASS',
            value: 'scss'
        },
        {
            name: "I don't want to add style file.",
            value: false
        }
    ]
};
