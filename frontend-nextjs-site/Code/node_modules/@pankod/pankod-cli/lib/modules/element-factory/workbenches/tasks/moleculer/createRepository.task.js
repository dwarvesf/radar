"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// #region Local Imports
const operations_1 = require("../../operations");
const paths_1 = require("../../../../paths");
const moleculer_params_1 = require("../../params/moleculer.params");
const _1 = require(".");
// #endregion Local Imports
exports.createRepository = (options) => {
    const templatePath = moleculer_params_1.createRepositoryParams.templatePath;
    const indexTemplate = moleculer_params_1.createRepositoryParams.indexTemplate;
    const addIndexParams = {
        dirPath: `${paths_1.moleculer.repositoriesDir}/index.ts`,
        getFileContent: () => operations_1.getTemplate(indexTemplate, options),
        message: 'Repository added to index.ts.'
    };
    const writeFileProps = {
        dirPath: `${paths_1.moleculer.repositoriesDir}/${options.upperFileName}.ts`,
        getFileContent: () => operations_1.getTemplate(templatePath, options),
        message: 'Added new Repository.'
    };
    const repositoryTestParams = Object.assign(Object.assign({}, options), { dirPath: `${paths_1.moleculer.repositoriesTestDir}/${options.upperFileName}.spec.ts`, successMessage: 'Added new Repository test.', templatePath: moleculer_params_1.createRepositoryParams.testTemplatePath });
    if (!operations_1.isAlreadyExist(paths_1.moleculer.interfaceDir, options.upperFileName)) {
        _1.createInterface(options, 'Repositories', '');
    }
    operations_1.writeFile(writeFileProps);
    operations_1.addToIndex(addIndexParams);
    _1.createEntityInstance(options, moleculer_params_1.createRepositoryParams.createEntityTemplatesParams);
    _1.createTest(repositoryTestParams);
};
