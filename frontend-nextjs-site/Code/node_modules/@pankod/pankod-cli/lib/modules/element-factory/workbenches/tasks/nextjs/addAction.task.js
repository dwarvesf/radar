"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const paths_1 = require("../../../../paths");
const operations_1 = require("../../operations");
// #endregion Local Imports
exports.addAction = (answers, params) => {
    const { actionIndexTemplatePath, actionTemplatePath } = params;
    const { fileName } = answers;
    const actionFileDir = `${paths_1.nextjs.actionDir}/${fileName}Actions.ts`;
    const templateProps = { fileName };
    const writeFileProps = {
        dirPath: actionFileDir,
        getFileContent: () => operations_1.getTemplate(actionTemplatePath, templateProps),
        message: 'Added new action file'
    };
    const addIndexParams = {
        dirPath: `${paths_1.nextjs.actionDir}/index.ts`,
        getFileContent: () => operations_1.getTemplate(actionIndexTemplatePath, templateProps),
        message: 'Added action file to index.ts Actions/index.ts'
    };
    operations_1.addToIndex(addIndexParams);
    operations_1.writeFile(writeFileProps);
};
