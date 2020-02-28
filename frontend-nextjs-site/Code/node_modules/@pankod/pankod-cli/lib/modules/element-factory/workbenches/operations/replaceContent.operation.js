"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// #region Local Imports
const operations = require(".");
// #endregion Local Imports
exports.replaceContent = (params) => {
    const replaceFile = params.filetoUpdate.replace(params.regexKey, params.getFileContent());
    const writeFileProps = {
        dirPath: params.fileDir,
        getFileContent: () => replaceFile,
        message: params.message
    };
    operations.writeFile(writeFileProps);
};
