"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moleculer_paths_1 = require("../../../../paths/moleculer.paths");
const operations_1 = require("../../operations");
const _1 = require(".");
const moleculer_params_1 = require("../../params/moleculer.params");
exports.createServiceHelper = (options) => {
    const writeFileProps = {
        dirPath: `${moleculer_paths_1.moleculer.servicesHelperDir}/${options.upperFileName}Helper.ts`,
        getFileContent: () => operations_1.getTemplate(moleculer_params_1.createServiceHelperParams.templatePath, options),
        message: 'Added new Service Helper'
    };
    const addIndexParams = {
        dirPath: `${moleculer_paths_1.moleculer.servicesHelperDir}/index.ts`,
        getFileContent: () => operations_1.getTemplate(moleculer_params_1.createServiceHelperParams.indexTemplate, options),
        message: 'Service Helper added to index.ts.'
    };
    const serviceHelperTestParams = Object.assign(Object.assign({}, options), { dirPath: `${moleculer_paths_1.moleculer.serviceHelperTestDir}/${options.upperFileName}Helper.spec.ts`, successMessage: 'Added new Micro Service Helper test.', templatePath: moleculer_params_1.createServiceHelperParams.testTemplatePath });
    operations_1.writeFile(writeFileProps);
    operations_1.addToIndex(addIndexParams);
    _1.createTest(serviceHelperTestParams);
};
