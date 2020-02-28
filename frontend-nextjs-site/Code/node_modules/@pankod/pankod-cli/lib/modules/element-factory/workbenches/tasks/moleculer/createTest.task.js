"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// #region Local Imports
const operations_1 = require("../../operations");
// #endregion Local Imports
exports.createTest = (options) => {
    const writeFileProps = {
        dirPath: options.dirPath,
        getFileContent: () => operations_1.getTemplate(options.templatePath, options),
        message: options.successMessage
    };
    operations_1.writeFile(writeFileProps);
};
