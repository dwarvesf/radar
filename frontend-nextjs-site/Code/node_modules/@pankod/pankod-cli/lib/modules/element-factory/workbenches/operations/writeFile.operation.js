"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// #region Global Imports
const fs = require("fs");
const path = require("path");
const logSymbols = require("log-symbols");
const chalk_1 = require("chalk");
const _1 = require(".");
// #endregion Local Imports
exports.writeFile = (params, replaceTarget) => {
    const { dirPath, getFileContent, message } = params;
    const target = path.resolve('', dirPath);
    if (fs.existsSync(target) && replaceTarget) {
        const content = fs.readFileSync(target, 'utf8');
        params.getFileContent = () => {
            return content.replace(replaceTarget, getFileContent());
        };
    }
    _1.failsafe(target);
    fs.writeFileSync(target, params.getFileContent());
    console.info(chalk_1.default.green(logSymbols.success, message));
};
