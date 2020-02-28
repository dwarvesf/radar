"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// #region Local Imports
const operations_1 = require("../../operations");
const paths_1 = require("../../../../paths");
const moleculer_params_1 = require("../../params/moleculer.params");
// #endregion Local Imports
exports.createInterface = (options, dirType, prefix = '') => {
    const { templatePath: templateFromParam, indexInterfaceTemplate, folderIndexTemplate } = moleculer_params_1.createServiceParams.createInterfaceParams;
    const templatePath = `${templateFromParam}/${prefix}Interface.mustache`;
    const templateProps = {
        dirType,
        interfaceName: options.interfaceName,
        upperFileName: options.upperFileName,
    };
    const interfaceFilePath = `${paths_1.moleculer.interfaceDir}/${dirType}/${options.upperFileName}/I${options.upperFileName}.d.ts`;
    const interfaceDirPath = `${paths_1.moleculer.interfaceDir}/${dirType}/${options.upperFileName}`;
    const writeFileProps = {
        dirPath: interfaceFilePath,
        getFileContent: () => operations_1.getTemplate(templatePath, templateProps),
        message: 'Created new interface file.'
    };
    const addIndexParams = {
        dirPath: `${paths_1.moleculer.interfaceDir}/index.ts`,
        getFileContent: () => operations_1.getTemplate(indexInterfaceTemplate, templateProps),
        message: 'Interface added to index.ts.'
    };
    const addFolderIndex = {
        dirPath: `${paths_1.moleculer.interfaceDir}/${dirType}/${options.upperFileName}/index.ts`,
        getFileContent: () => operations_1.getTemplate(folderIndexTemplate, templateProps),
        message: 'Interface added to folder index.ts.'
    };
    operations_1.createFile(interfaceDirPath);
    operations_1.writeFile(writeFileProps);
    operations_1.addToIndex(addIndexParams);
    operations_1.addToIndex(addFolderIndex);
};
