"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// #region Global Imports
const fs = require("fs");
const path = require("path");
const logSymbols = require("log-symbols");
const chalk_1 = require("chalk");
const _1 = require(".");
// #endregion Local Imports
exports.addToIndex = (params) => {
    const target = path.resolve('', params.dirPath);
    _1.failsafe(target, true);
    const content = fs.readFileSync(target, 'utf-8');
    const clearToAppend = content.replace(/s$/, '');
    fs.writeFileSync(target, clearToAppend);
    fs.appendFileSync(target, `${params.getFileContent()}`);
    console.log(chalk_1.default.green(logSymbols.success, params.message));
};
