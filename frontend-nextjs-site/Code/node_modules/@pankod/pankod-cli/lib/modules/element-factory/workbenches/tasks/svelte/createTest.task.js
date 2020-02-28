"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const operations_1 = require("../../operations");
const svelte_params_1 = require("../../params/svelte.params");
// #endregion Local Imports
exports.createTest = (options) => {
    const { templatePath } = svelte_params_1.createTestParams;
    const { dirPath, successMessage } = options;
    const writeFileProps = {
        dirPath,
        getFileContent: () => operations_1.getTemplate(templatePath, options),
        message: successMessage
    };
    operations_1.writeFile(writeFileProps);
};
