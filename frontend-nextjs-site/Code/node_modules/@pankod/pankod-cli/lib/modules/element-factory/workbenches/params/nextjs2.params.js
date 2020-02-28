"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// #region Local Imports
const paths = require("../../../paths");
// #endregion Local Imports
exports.createInterfaceParams = {
    templatePath: paths.nextjs2.templates.createInterfaceTempPath,
    pageInterfaceIndex: paths.nextjs2.templates.pageInterfaceIndex,
    storeImportInterface: paths.nextjs2.templates.storeImportInterface,
    storeImportInterfaceFormatted: paths.nextjs2.templates.storeImportInterfaceFormatted,
    compInterfaceIndex: paths.nextjs2.templates.compInterfaceIndex,
    storeInterface: paths.nextjs2.templates.storeInterface,
    interfaceDir: paths.nextjs2.interfaceDir,
    reduxInterfaceDir: paths.nextjs2.reduxInterfaceDir,
    pageInterfaceDir: paths.nextjs2.pageInterfaceDir,
    compInterfaceDir: paths.nextjs2.compInterfaceDir,
    componentsDir: paths.nextjs2.componentsDir
};
exports.addActionConstIndexParams = {
    actionConstTemplatePath: paths.nextjs2.templates.actionConstTemplatePath,
    actionConstsFileDir: paths.nextjs2.actionConstsFileDir
};
exports.addActionParams = {
    actionIndexTemplatePath: paths.nextjs2.templates.actionIndexTemplatePath,
    actionTemplatePath: paths.nextjs2.templates.actionTemplatePath,
    actionTestTemplatePath: paths.nextjs2.templates.actionTestTemplatePath
};
exports.addReducerParams = {
    addActionConstIndexParams: exports.addActionConstIndexParams,
    reducerIndexTemplatePath: paths.nextjs2.templates.reducerIndexTemplatePath,
    reducerStoreTemplatePath: paths.nextjs2.templates.reducerStoreTemplatePath,
    reducerTemplatePath: paths.nextjs2.templates.reducerTemplatePath,
    reducerTestTemplatePath: paths.nextjs2.templates.reducerTestTemplatePath
};
exports.createClassComponentParams = {
    templatePath: paths.nextjs2.templates.classComponentTemplatePath,
    indexTemplatePath: paths.nextjs2.templates.componentIndexTemplatePath,
    componentsDir: paths.nextjs2.componentsDir,
    createInterfaceParams: exports.createInterfaceParams,
    addReducerParams: exports.addReducerParams,
    addActionParams: exports.addActionParams,
    componentTestTemplatePath: paths.nextjs2.templates.componentTestTemplatePath
};
exports.createFuncComponentParams = {
    templatePath: paths.nextjs2.templates.funcComponentTemplate,
    indexTemplatePath: paths.nextjs2.templates.componentIndexTemplatePath,
    componentsDir: paths.nextjs2.componentsDir,
    createInterfaceParams: exports.createInterfaceParams,
    addReducerParams: exports.addReducerParams,
    addActionParams: exports.addActionParams,
    componentTestTemplatePath: paths.nextjs2.templates.componentTestTemplatePath
};
exports.createStyleParams = {
    templatePath: paths.nextjs2.templates.stylePageTemplate,
    compDirPath: paths.nextjs2.componentsDir,
    pageDirPath: paths.nextjs2.pagesDir
};
exports.createStyledComponentParams = {
    templatePath: paths.nextjs2.templates.styledComponentsTemplatePath,
    compDirPath: paths.nextjs2.componentsDir,
    pageStyledDirPath: paths.nextjs2.pageStyledDir
};
