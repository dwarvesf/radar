"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// #region Local Imports
const operations_1 = require("../../operations");
const paths_1 = require("../../../../paths");
const moleculer_params_1 = require("../../params/moleculer.params");
const _1 = require(".");
// #endregion Local Imports
exports.createService = (options) => {
    const addIndexParams = {
        dirPath: `${paths_1.moleculer.servicesDir}/index.ts`,
        getFileContent: () => operations_1.getTemplate(moleculer_params_1.createServiceParams.indexTemplate, options),
        message: 'Service added to index.ts.'
    };
    const writeFileProps = {
        dirPath: `${paths_1.moleculer.servicesDir}/${options.lowerFileName}.service.ts`,
        getFileContent: () => operations_1.getTemplate(moleculer_params_1.createServiceParams.templatePath, options),
        message: 'Added new Service.'
    };
    const serviceTestParams = Object.assign(Object.assign({}, options), { dirPath: `${paths_1.moleculer.servicesTestDir}/${options.lowerFileName}.spec.ts`, successMessage: 'Added new Microservice test.', templatePath: moleculer_params_1.createServiceParams.testTemplatePath });
    const integrationTestParams = Object.assign(Object.assign({}, options), { dirPath: `${paths_1.moleculer.integrationTestDir}/${options.lowerFileName}.spec.ts`, successMessage: 'Added new Integration test.', templatePath: moleculer_params_1.createServiceParams.integrationTemplatePath });
    if (!operations_1.isAlreadyExist(paths_1.moleculer.interfaceDir, options.upperFileName, true)) {
        _1.createInterface(options, 'Services', 'Service');
    }
    operations_1.writeFile(writeFileProps);
    operations_1.addToIndex(addIndexParams);
    _1.createServiceHelper(options);
    _1.createTest(serviceTestParams);
    _1.createIntegrationTest(integrationTestParams);
    _1.addBrokerHelper(options);
};
