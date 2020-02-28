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
exports.enterPageName = {
    message: 'Enter page name',
    name: 'fileName',
    type: 'input',
    validate(val) {
        return operations_1.validate(val, paths.nextjs.pagesDir, false, 'page');
    }
};
exports.customPath = {
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
    ],
    message: 'Do you want to add custom route or use default route name?',
    name: 'hasPath',
    type: 'list'
};
exports.routeName = {
    message: 'Enter route name',
    name: 'routePath',
    type: 'input',
    when: ({ hasPath = false }) => hasPath
};
