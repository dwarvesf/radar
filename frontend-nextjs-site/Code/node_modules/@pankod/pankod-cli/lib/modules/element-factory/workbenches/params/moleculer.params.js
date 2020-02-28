"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// #region Local Imports
const paths = require("../../../paths");
// #endregion Local Imports
const createInterfaceParams = {
    folderIndexTemplate: paths.moleculer.templates.createInterfaceFolderIndexTemplate,
    indexInterfaceTemplate: paths.moleculer.templates.createInterfaceIndexInterfaceTemplate,
    templatePath: paths.moleculer.templates.createInterfaceTemplatePath
};
exports.createServiceParams = {
    indexTemplate: paths.moleculer.templates.createServiceIndexTemplate,
    integrationTemplatePath: paths.moleculer.templates.createServiceIntegrationTestTemplate,
    templatePath: paths.moleculer.templates.createServiceTemplatePath,
    testTemplatePath: paths.moleculer.templates.createServiceTestTemplate,
    brokerHelperTemplatesParams: {
        brokerHelperCreate: paths.moleculer.templates.brokerHelperCreate,
        brokerHelperImport: paths.moleculer.templates.brokerHelperImport,
        replaceFileDir: paths.moleculer.brokerHelper
    },
    createServiceHelperParams: {
        indexTemplate: paths.moleculer.templates.createServiceHelperIndexTemplate,
        templatePath: paths.moleculer.templates.createServiceHelperTemplatePath,
        testTemplatePath: paths.moleculer.templates.createServiceHelperTestTemplatePath
    },
    createInterfaceParams
};
exports.createServiceHelperParams = {
    indexTemplate: paths.moleculer.templates.createServiceHelperIndexTemplate,
    templatePath: paths.moleculer.templates.createServiceHelperTemplatePath,
    testTemplatePath: paths.moleculer.templates.createServiceHelperTestTemplatePath
};
exports.createRepositoryParams = {
    indexTemplate: paths.moleculer.templates.createRepositoryIndexTemplate,
    templatePath: paths.moleculer.templates.createRepositoryTemplatePath,
    testTemplatePath: paths.moleculer.templates.createRepositoryTestTemplatePath,
    createInterfaceParams,
    createEntityTemplatesParams: {
        indexTemplate: paths.moleculer.templates.createEntityIndexTemplate,
        templatePath: paths.moleculer.templates.createEntityTemplatePath
    }
};
