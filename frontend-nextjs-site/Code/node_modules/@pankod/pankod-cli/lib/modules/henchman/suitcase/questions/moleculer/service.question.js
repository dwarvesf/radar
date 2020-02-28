"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// #endregion Global Imports
// #region Local Imports
// TODO: Reshape directory or use @Module
const paths = require("../../../../paths");
const operations_1 = require("../../../../element-factory/workbenches/operations");
// #endregion Local Imports
exports.serviceName = {
    message: 'Enter service name',
    name: 'fileName',
    type: 'input',
    validate(val) {
        return operations_1.validate(val, paths.moleculer.servicesDir, true, 'service');
    }
};
exports.isPrivate = {
    default: true,
    message: 'Is service open to outside?',
    name: 'isPrivate',
    type: 'confirm'
};
exports.hasDatabase = {
    default: true,
    message: 'Are you going to have a database connection?',
    name: 'hasDatabase',
    type: 'confirm'
};
