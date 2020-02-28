"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// #region Local Imports
const paths_1 = require("../../../../paths");
const nextjs2_params_1 = require("../../params/nextjs2.params");
const operations_1 = require("../../operations");
const _1 = require(".");
// #region Local Imports
exports.createFuncComponent = (options) => {
    const { templatePath, indexTemplatePath, componentTestTemplatePath, addReducerParams, addActionParams } = nextjs2_params_1.createFuncComponentParams;
    const { lowerFileName, hasStyle, isPage, isConnectStore } = options;
    options.isScss = hasStyle === 'scss';
    options.isStyled = hasStyle === 'styled';
    if (isPage) {
        options.funcComponentDir = `${paths_1.nextjs2.pagesDir}/${lowerFileName}`;
        const addRouteParams = {
            routesDir: paths_1.nextjs2.routesDir,
            routesTemplate: paths_1.nextjs2.templates.addRouteTemplate
        };
        _1.addRoute(options, addRouteParams);
    }
    else {
        options.funcComponentDir = `${paths_1.nextjs2.componentsDir}/${options.fileName}`;
        const addIndexParams = {
            dirPath: `${paths_1.nextjs2.componentsDir}/index.ts`,
            getFileContent: () => operations_1.getTemplate(indexTemplatePath, options),
            message: 'Component added to index.ts'
        };
        operations_1.addToIndex(addIndexParams);
    }
    const writeFileProps = {
        dirPath: `${options.funcComponentDir}/index.tsx`,
        getFileContent: () => operations_1.getTemplate(templatePath, options),
        message: 'Added new functional component.'
    };
    const writeTestFileProps = {
        dirPath: `${options.funcComponentDir}/index.spec.tsx`,
        getFileContent: () => operations_1.getTemplate(componentTestTemplatePath, options),
        message: 'Added unit test of component.'
    };
    operations_1.createFile(options.funcComponentDir);
    operations_1.writeFile(writeFileProps, /;(?:(\n|\r|\s))*$/);
    !isPage && operations_1.writeFile(writeTestFileProps);
    _1.createInterface(options);
    _1.createStyle(options);
    if (isConnectStore) {
        _1.addReducer(options, addReducerParams);
        _1.addAction(options, addActionParams);
    }
};
