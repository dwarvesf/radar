"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// #region Local Imports
const paths = require("../../../paths");
// #endregion Local Imports
exports.createInterfaceParams = {
    templatePath: paths.nextjs.templates.createInterfaceTempPath,
    pageInterfaceIndex: paths.nextjs.templates.pageInterfaceIndex,
    storeImportInterface: paths.nextjs.templates.storeImportInterface,
    storeImportInterfaceFormatted: paths.nextjs.templates.storeImportInterfaceFormatted,
    compInterfaceIndex: paths.nextjs.templates.compInterfaceIndex,
    storeInterface: paths.nextjs.templates.storeInterface,
    interfaceDir: paths.nextjs.interfaceDir,
    reduxInterfaceDir: paths.nextjs.reduxInterfaceDir,
    pageInterfaceDir: paths.nextjs.pageInterfaceDir,
    compInterfaceDir: paths.nextjs.compInterfaceDir
};
exports.addActionConstIndexParams = {
    actionConstTemplatePath: paths.nextjs.templates.actionConstTemplatePath
};
exports.addActionParams = {
    actionIndexTemplatePath: paths.nextjs.templates.actionIndexTemplatePath,
    actionTemplatePath: paths.nextjs.templates.actionTemplatePath
};
exports.addReducerParams = {
    addActionConstIndexParams: exports.addActionConstIndexParams,
    reducerIndexTemplatePath: paths.nextjs.templates.reducerIndexTemplatePath,
    reducerStoreTemplatePath: paths.nextjs.templates.reducerStoreTemplatePath,
    reducerTemplatePath: paths.nextjs.templates.reducerTemplatePath
};
exports.createClassComponentParams = {
    templatePath: paths.nextjs.templates.classComponentTemplatePath,
    indexTemplatePath: paths.nextjs.templates.componentIndexTemplatePath,
    createInterfaceParams: exports.createInterfaceParams,
    addReducerParams: exports.addReducerParams,
    addActionParams: exports.addActionParams
};
exports.createFuncComponentParams = {
    templatePath: paths.nextjs.templates.funcComponentTemplate,
    indexTemplatePath: paths.nextjs.templates.componentIndexTemplatePath,
    componentsDir: paths.nextjs.componentsDir,
    createInterfaceParams: exports.createInterfaceParams
};
exports.createStyleParams = {
    compDirPath: paths.nextjs.componentsDir,
    pageDirPath: paths.nextjs.pagesDir,
    templatePath: paths.nextjs.templates.stylePageTemplate
};
