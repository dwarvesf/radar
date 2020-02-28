"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// #region Global Imports
const fs = require("fs");
const path = require("path");
// #endregion Global Imports
exports.isAlreadyExist = (startPath = '', val = '', isFile = false, fileType) => {
    let _path;
    switch (fileType) {
        case 'page':
            val = val.replace(/\b\w/g, foo => foo.toLowerCase());
            _path = `${startPath}/${val}`;
            break;
        case 'service':
            val = val.replace(/\b\w/g, foo => foo.toLowerCase());
            _path = `${startPath}/${val}.service.ts`;
            break;
        default:
            val = val.replace(/\b\w/g, foo => foo.toUpperCase());
            _path = isFile ? `${startPath}/${val}.ts` : `${startPath}/${val}`;
            break;
    }
    return fs.existsSync(path.resolve('', _path));
};
