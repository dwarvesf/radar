"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// #region Global Imports
const chalk_1 = require("chalk");
// #endregion Global Imports
// #region Local Imports
const _1 = require(".");
// #endregion Local Imports
const { red, bold } = chalk_1.default;
exports.validate = (val, dirPath, isFile, fileType) => {
    if (val.length) {
        if (!val.match(/^[^\W_]+$/gi)) {
            return red('Special characters and spaces are NOT allowed!');
        }
        else if (_1.isAlreadyExist(dirPath, val, isFile, fileType)) {
            return red(`This ${bold(fileType)} name already used before, enter new name.`);
        }
        return true;
    }
    return red('Can NOT be empty!');
};
