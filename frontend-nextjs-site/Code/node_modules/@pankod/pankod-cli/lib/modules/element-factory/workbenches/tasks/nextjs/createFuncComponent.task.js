"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const operations_1 = require("../../operations");
const nextjs_params_1 = require("../../params/nextjs.params");
const _1 = require(".");
// #endregion Local Imports
exports.createFuncComponent = (answers) => {
    const { lowerFileName, fileName, hasStyle } = answers;
    const { componentsDir, indexTemplatePath, templatePath, createInterfaceParams } = nextjs_params_1.createFuncComponentParams;
    const funcDir = `${componentsDir}/${answers.fileName}`;
    const templateProps = {
        fileName,
        hasStyle,
        interfaceName: `I${fileName}`,
        lowerFileName
    };
    const addIndexParams = {
        dirPath: `${componentsDir}/index.ts`,
        getFileContent: () => operations_1.getTemplate(indexTemplatePath, templateProps),
        message: 'Component added to index.ts.'
    };
    const writeFileProps = {
        dirPath: `${funcDir}/index.tsx`,
        getFileContent: () => operations_1.getTemplate(templatePath, templateProps),
        message: 'Add new functional component.'
    };
    operations_1.createFile(funcDir);
    operations_1.writeFile(writeFileProps);
    operations_1.addToIndex(addIndexParams);
    _1.createInterface(answers, false, createInterfaceParams);
};
