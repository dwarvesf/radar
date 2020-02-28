"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const operations_1 = require("../../operations");
const _1 = require(".");
// #endregion Local Imports
exports.addBrokerHelper = (options) => {
    const interoperations = ['import', 'create'];
    interoperations.forEach(operation => {
        operations_1.replaceContent(_1.createParamsForAddBrokerHelper(operation, options));
    });
};
