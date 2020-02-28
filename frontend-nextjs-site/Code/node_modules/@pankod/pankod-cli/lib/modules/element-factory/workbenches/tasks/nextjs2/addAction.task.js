"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const operations_1 = require("../../operations");
const paths_1 = require("../../../../paths");
// #region Local Imports
exports.addAction = (options, params) => {
    const { actionIndexTemplatePath, actionTemplatePath, actionTestTemplatePath } = params;
    const actionFolderDir = `${paths_1.nextjs2.actionDir}/${options.fileName}Actions`;
    const actionFileDir = `${actionFolderDir}/index.ts`;
    const testFileDir = `${actionFolderDir}/index.spec.ts`;
    const writeFileProps = {
        dirPath: actionFileDir,
        getFileContent: () => operations_1.getTemplate(actionTemplatePath, options),
        message: 'Added new action file'
    };
    const addIndexParams = {
        dirPath: `${paths_1.nextjs2.actionDir}/index.ts`,
        getFileContent: () => operations_1.getTemplate(actionIndexTemplatePath, options),
        message: 'Added action file to index.ts Actions/index.ts'
    };
    const addTestParams = {
        dirPath: testFileDir,
        getFileContent: () => operations_1.getTemplate(actionTestTemplatePath, options),
        message: 'Added action test'
    };
    operations_1.createFile(actionFolderDir);
    operations_1.addToIndex(addIndexParams);
    operations_1.writeFile(writeFileProps);
    operations_1.writeFile(addTestParams);
};
