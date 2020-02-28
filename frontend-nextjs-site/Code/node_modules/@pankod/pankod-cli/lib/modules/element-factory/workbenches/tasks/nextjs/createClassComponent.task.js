"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const paths_1 = require("../../../../paths");
const operations_1 = require("../../operations");
const nextjs_params_1 = require("../../params/nextjs.params");
const _1 = require(".");
// #endregion Local Imports
exports.createClassComponent = (options) => {
    const { templatePath, indexTemplatePath, createInterfaceParams, addReducerParams, addActionParams } = nextjs_params_1.createClassComponentParams;
    const { lowerFileName, isConnectStore = false, isPage = false } = options;
    const pagesDir = `${paths_1.nextjs.pagesDir}/${lowerFileName}`;
    const classDir = isPage
        ? pagesDir
        : `${paths_1.nextjs.componentsDir}/${options.fileName}`;
    const addIndexParams = {
        dirPath: `${paths_1.nextjs.componentsDir}/index.ts`,
        getFileContent: () => operations_1.getTemplate(indexTemplatePath, options),
        message: 'Component added to index.ts'
    };
    const writeFileProps = {
        dirPath: `${classDir}/index.tsx`,
        getFileContent: () => operations_1.getTemplate(templatePath, options),
        message: 'Added new class component'
    };
    operations_1.createFile(classDir);
    operations_1.writeFile(writeFileProps);
    _1.createInterface(options, true, createInterfaceParams);
    if (isConnectStore) {
        _1.addReducer(options, addReducerParams);
        _1.addAction(options, addActionParams);
    }
    if (!isPage) {
        operations_1.addToIndex(addIndexParams);
    }
};
