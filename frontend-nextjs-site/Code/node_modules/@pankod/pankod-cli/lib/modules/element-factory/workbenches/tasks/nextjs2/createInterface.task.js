"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// #region Global Imports
const fs = require("fs");
const path = require("path");
const operations_1 = require("../../operations");
const nextjs2_params_1 = require("../../params/nextjs2.params");
// #region Local Imports
exports.createInterface = (options) => {
    const { fileName, isPage, isConnectStore } = options;
    const { interfaceDir, pageInterfaceIndex, pageInterfaceDir, componentsDir, templatePath, reduxInterfaceDir, storeImportInterface, storeImportInterfaceFormatted, storeInterface } = nextjs2_params_1.createInterfaceParams;
    options.isClass = !!options.classDir;
    const pageDirPath = `${pageInterfaceDir}/${fileName}.d.ts`;
    const compDirPath = `${componentsDir}/${fileName}/${fileName}.d.ts`;
    const writeFileProps = {
        dirPath: isPage ? pageDirPath : compDirPath,
        getFileContent: () => operations_1.getTemplate(templatePath, options),
        message: 'Added new interface file'
    };
    const commonReplaceParams = (template, message, regexKey, formatted = []) => {
        const params = {
            fileDir: reduxInterfaceDir,
            filetoUpdate: fs.readFileSync(path.resolve('', reduxInterfaceDir), 'utf8'),
            getFileContent: () => operations_1.getTemplate(template, options),
            message,
            regexKey
        };
        // * Change RegExp if file is formatted
        const [formattedTarget, formattedRegex] = formatted;
        if (formattedRegex && params.filetoUpdate.match(formattedRegex)) {
            return Object.assign(Object.assign({}, params), { regexKey: formattedRegex, getFileContent: () => operations_1.getTemplate(formattedTarget, options) });
        }
        return params;
    };
    operations_1.writeFile(writeFileProps);
    if (isPage) {
        const replaceContentParams = {
            fileDir: interfaceDir,
            filetoUpdate: fs.readFileSync(path.resolve('', interfaceDir), 'utf8'),
            getFileContent: () => operations_1.getTemplate(pageInterfaceIndex, options),
            message: 'Interface file added to Interfaces/index.ts',
            regexKey: /\/\/(?: |)#endregion Page Interfaces/g
        };
        operations_1.replaceContent(replaceContentParams);
    }
    if (isConnectStore) {
        const replaceStoreParams = commonReplaceParams(storeInterface, 'Interface file added to Redux/IStore.d.ts', /export interface IStore\s[{]/g);
        operations_1.replaceContent(replaceStoreParams);
        const replaceStoreImportParams = commonReplaceParams(storeImportInterface, 'Interface file added to import section in Redux/IStore.d.ts', / } from "@Interfaces";/, [storeImportInterfaceFormatted, /(,|)\n} from "@Interfaces";/]);
        operations_1.replaceContent(replaceStoreImportParams);
    }
};
