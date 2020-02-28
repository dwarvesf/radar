"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
        return operations_1.validate(val, paths.nextjs2.pagesDir, false, 'page');
    }
};
