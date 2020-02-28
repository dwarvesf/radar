"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// #region Global Imports
const inquirer = require("inquirer");
// #endregion Local Imports
exports.addPlugin = {
    message: 'What plugin do you want to add?',
    name: 'pluginType',
    type: 'list',
    default: 'styled',
    choices: [
        new inquirer.Separator(),
        {
            name: 'Styled Components',
            value: 'styled'
        },
        {
            name: 'Sass',
            value: 'sass'
        }
    ],
};
