"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// #region Global Imports
const fs = require("fs");
const path = require("path");
const operations_1 = require("../../operations");
const paths_1 = require("../../../../paths");
const _1 = require(".");
// #endregion Local Imports
exports.addReducer = (answers, params) => {
    const { reducerIndexTemplatePath, reducerTemplatePath, addActionConstIndexParams, reducerStoreTemplatePath, reducerTestTemplatePath } = params;
    const { fileName, lowerFileName, isConnectStore, upperFileName, interfaceName } = answers;
    const reducerFolderDir = `${paths_1.nextjs2.reducerDir}/${lowerFileName}`;
    const reducerFileDir = `${reducerFolderDir}/index.ts`;
    const templateProps = { fileName, lowerFileName, upperFileName, interfaceName };
    const replaceContentParams = {
        fileDir: `${paths_1.nextjs2.reducerDir}/index.ts`,
        filetoUpdate: fs.readFileSync(path.resolve('', `${paths_1.nextjs2.reducerDir}/index.ts`), 'utf8'),
        getFileContent: () => operations_1.getTemplate(reducerIndexTemplatePath, templateProps),
        message: 'Reducer added to Redux/Reducers/index.ts',
        regexKey: /\/\/ #endregion Local Imports/g
    };
    const testFileDir = `${reducerFolderDir}/index.spec.ts`;
    const addTestParams = {
        dirPath: testFileDir,
        getFileContent: () => operations_1.getTemplate(reducerTestTemplatePath, templateProps),
        message: 'Added reducer test'
    };
    const writeFileProps = {
        dirPath: reducerFileDir,
        getFileContent: () => operations_1.getTemplate(reducerTemplatePath, templateProps),
        message: 'Added new reducer file'
    };
    operations_1.createFile(reducerFolderDir);
    operations_1.writeFile(writeFileProps);
    operations_1.replaceContent(replaceContentParams);
    operations_1.writeFile(addTestParams);
    const replaceReducerContentParams = {
        fileDir: `${paths_1.nextjs2.reducerDir}/index.ts`,
        filetoUpdate: fs.readFileSync(path.resolve('', `${paths_1.nextjs2.reducerDir}/index.ts`), 'utf8'),
        getFileContent: () => operations_1.getTemplate(reducerStoreTemplatePath, templateProps),
        message: 'Reducer file added combineReducers in Redux/Reducers/index.ts',
        regexKey: /export default combineReducers[(][{]/g
    };
    operations_1.replaceContent(replaceReducerContentParams);
    if (isConnectStore) {
        _1.addActionConstIndex(templateProps, addActionConstIndexParams);
    }
};
