"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// #region Global Imports
const inquirer = require("inquirer");
// #endregion Global Imports
// #region Local Imports
// TODO: Reshape directory or use @Module
const paths = require("../../../../paths");
const operations_1 = require("../../../../element-factory/workbenches/operations");
// #endregion Local Imports
exports.addStyle = {
    default: true,
    message: 'Do you want to add style file?',
    name: 'hasStyle',
    type: 'confirm'
};
exports.connectStore = {
    default: false,
    message: 'Do you want to connect store ?',
    name: 'isConnectStore',
    type: 'confirm'
};
exports.enterComponentName = {
    message: 'Enter component name',
    name: 'fileName',
    type: 'input',
    validate(val) {
        return operations_1.validate(val, paths.nextjs.componentsDir, false, 'component');
    }
};
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
