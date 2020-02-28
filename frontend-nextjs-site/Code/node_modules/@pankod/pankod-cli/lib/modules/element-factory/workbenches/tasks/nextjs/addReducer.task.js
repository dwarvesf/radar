"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// #region Global Imports
const fs = require("fs");
const path = require("path");
const paths_1 = require("../../../../paths");
const operations_1 = require("../../operations");
const _1 = require(".");
// #endregion Local Imports
exports.addReducer = (answers, params) => {
    const { reducerIndexTemplatePath, reducerTemplatePath, addActionConstIndexParams, reducerStoreTemplatePath } = params;
    const { fileName, lowerFileName, isConnectStore = false, upperFileName } = answers;
    const reducerFileDir = `${paths_1.nextjs.reducerDir}/${lowerFileName}.ts`;
    const templateProps = { fileName, lowerFileName, upperFileName };
    const replaceContentParams = {
        fileDir: `${paths_1.nextjs.reducerDir}/index.ts`,
        filetoUpdate: fs.readFileSync(path.resolve('', `${paths_1.nextjs.reducerDir}/index.ts`), 'utf8'),
        getFileContent: () => operations_1.getTemplate(reducerIndexTemplatePath, templateProps),
        message: 'Reducer added to Redux/Reducers/index.ts',
        regexKey: /import { combineReducers } from 'redux';\n\w*/
    };
    const writeFileProps = {
        dirPath: reducerFileDir,
        getFileContent: () => operations_1.getTemplate(reducerTemplatePath, templateProps),
        message: 'Added new reducer file'
    };
    operations_1.writeFile(writeFileProps);
    operations_1.replaceContent(replaceContentParams);
    setTimeout(() => {
        const replaceReducerContentParams = {
            fileDir: `${paths_1.nextjs.reducerDir}/index.ts`,
            filetoUpdate: fs.readFileSync(path.resolve('', `${paths_1.nextjs.reducerDir}/index.ts`), 'utf8'),
            getFileContent: () => operations_1.getTemplate(reducerStoreTemplatePath, templateProps),
            message: 'Reducer file added combineReducers in Redux/Reducers/index.ts',
            regexKey: /export default combineReducers[(][{]/g
        };
        operations_1.replaceContent(replaceReducerContentParams);
    }, 100);
    if (isConnectStore) {
        _1.addActionConstIndex(templateProps, addActionConstIndexParams);
    }
};
