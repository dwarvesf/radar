"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// #region Local Imports
const operations_1 = require("../../operations");
const svelte_params_1 = require("../../params/svelte.params");
// #endregion Local Imports
exports.createStyle = (options) => {
    const { fileName } = options;
    const compDirPath = `${svelte_params_1.createStyleParams.compDirPath}/${fileName}/style.scss`;
    const writeFileProps = {
        dirPath: compDirPath,
        getFileContent: () => operations_1.getTemplate(svelte_params_1.createStyleParams.templatePath, options),
        message: 'Added new style file'
    };
    operations_1.writeFile(writeFileProps);
};
