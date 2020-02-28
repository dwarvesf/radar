"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// #region Global Imports
const fs = require("fs");
const path = require("path");
const operations_1 = require("../../operations");
// #endregion Local Imports
exports.createInterface = (answers, isClass, createInterfaceParams) => {
    const { fileName, lowerFileName, isPage = false, isConnectStore = false, upperFileName } = answers;
    const templateProps = {
        fileName,
        isClass,
        lowerFileName,
        isConnectStore,
        upperFileName
    };
    const pageDirPath = `${createInterfaceParams.pageInterfaceDir}/${fileName}.d.ts`;
    const compDirPath = `${createInterfaceParams.compInterfaceDir}/${fileName}.d.ts`;
    const writeFileProps = {
        dirPath: isPage ? pageDirPath : compDirPath,
        getFileContent: () => operations_1.getTemplate(createInterfaceParams.templatePath, templateProps),
        message: 'Added new interface file'
    };
    const replaceContentParams = {
        fileDir: createInterfaceParams.interfaceDir,
        filetoUpdate: fs.readFileSync(path.resolve('', createInterfaceParams.interfaceDir), 'utf8'),
        getFileContent: () => operations_1.getTemplate(isPage
            ? createInterfaceParams.pageInterfaceIndex
            : createInterfaceParams.compInterfaceIndex, templateProps),
        message: 'Interface file added to Interfaces/index.ts',
        regexKey: isPage ? /...PAGE INTERFACES/g : /...COMPONENT INTERFACES/g
    };
    const commonReplaceParams = (contentFile, message, regexKey, formatted = []) => {
        const params = {
            fileDir: createInterfaceParams.reduxInterfaceDir,
            filetoUpdate: fs.readFileSync(path.resolve('', createInterfaceParams.reduxInterfaceDir), 'utf8'),
            getFileContent: () => operations_1.getTemplate(contentFile, templateProps),
            message,
            regexKey
        };
        // * Change RegExp if file is formatted
        const [formattedTarget, formattedRegex] = formatted;
        if (formattedRegex && params.filetoUpdate.match(formattedRegex)) {
            return Object.assign(Object.assign({}, params), { regexKey: formattedRegex, getFileContent: () => operations_1.getTemplate(formattedTarget, templateProps) });
        }
        return params;
    };
    operations_1.writeFile(writeFileProps);
    operations_1.replaceContent(replaceContentParams);
    if (isConnectStore) {
        const replaceStoreParams = commonReplaceParams(createInterfaceParams.storeInterface, 'Interface file added to Interfaces/Redux/Store.d.ts', /export interface IStore\s[{]/g);
        operations_1.replaceContent(replaceStoreParams);
        const replaceStoreImportParams = commonReplaceParams(createInterfaceParams.storeImportInterface, 'Interface file added to import section in Interfaces/Redux/Store.d.ts', /\s[}] from '@Interfaces';/g, [
            createInterfaceParams.storeImportInterfaceFormatted,
            /(,|)\n} from '@Interfaces';/
        ]);
        operations_1.replaceContent(replaceStoreImportParams);
    }
};
