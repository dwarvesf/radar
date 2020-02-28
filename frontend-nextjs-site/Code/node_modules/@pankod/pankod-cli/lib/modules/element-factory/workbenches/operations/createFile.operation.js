"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// #region Global Imports
const fs = require("fs");
const path = require("path");
// #endregion Global Imports
// #region Local Imports
const _1 = require(".");
// #endregion Local Imports
exports.createFile = (dirPath) => {
    _1.failsafe(dirPath);
    fs.mkdirSync(path.resolve('', dirPath));
};
