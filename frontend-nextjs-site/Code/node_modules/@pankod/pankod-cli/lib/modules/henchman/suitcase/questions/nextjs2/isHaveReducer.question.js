"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// #region Global Imports
const inquirer = require("inquirer");
// #endregion Local Imports
exports.isHaveReducer = {
    choices: [
        new inquirer.Separator(),
        {
            name: 'Yes, I want to have new reducer.',
            value: true
        },
        {
            name: 'No, do not create a new reducer.',
            value: false
        }
    ],
    message: 'Do you want to create a new reducer or use your own?',
    name: 'isHaveReducer',
    type: 'list',
    when: ({ isConnectStore = false }) => isConnectStore
};
