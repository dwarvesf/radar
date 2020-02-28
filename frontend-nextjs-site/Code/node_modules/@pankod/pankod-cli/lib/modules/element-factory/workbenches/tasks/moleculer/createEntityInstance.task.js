"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// #region Local Imports
const operations_1 = require("../../operations");
const paths_1 = require("../../../../paths");
// #endregion Local Imports
exports.createEntityInstance = (answers, createEntityHelperParams) => {
    const templateProps = { fileName: answers.fileName };
    const writeFileProps = {
        dirPath: `${paths_1.moleculer.entityDir}/${answers.fileName}.ts`,
        getFileContent: () => operations_1.getTemplate(createEntityHelperParams.templatePath, templateProps),
        message: 'Added new Entity Instance.'
    };
    const addIndexParams = {
        dirPath: `${paths_1.moleculer.entityDir}/index.ts`,
        getFileContent: () => operations_1.getTemplate(createEntityHelperParams.indexTemplate, templateProps),
        message: 'Entity added to index.ts.'
    };
    operations_1.writeFile(writeFileProps);
    operations_1.addToIndex(addIndexParams);
};
