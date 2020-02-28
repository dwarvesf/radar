"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.moleculer = {
    brokerHelper: './test/Utils/BrokerHelper.ts',
    entityDir: './src/Entities',
    integrationTestDir: './test/Integration',
    interfaceDir: './src/Interfaces',
    repositoriesDir: './src/Repositories',
    repositoriesTestDir: './test/Unit/Repositories',
    serviceHelperTestDir: './test/Unit/ServiceHelpers',
    servicesDir: './services',
    servicesHelperDir: './src/ServiceHelpers',
    servicesTestDir: './test/Unit/MicroServices',
    templates: {
        brokerHelperCreate: './lib/Templates/moleculer/Tests/BrokerHelperCreate.mustache',
        brokerHelperImport: './lib/Templates/moleculer/Tests/BrokerHelperImport.mustache',
        createEntityIndexTemplate: './lib/Templates/moleculer/Repositories/EntityIndex.mustache',
        createEntityTemplatePath: './lib/Templates/moleculer/Repositories/Entity.mustache',
        createServiceHelperIndexTemplate: './lib/Templates/moleculer/Services/HelperIndex.mustache',
        createServiceHelperTemplatePath: './lib/Templates/moleculer/Services/Helper.mustache',
        createServiceHelperTestTemplatePath: './lib/Templates/moleculer/Tests/ServiceHelper.mustache',
        createServiceIndexTemplate: './lib/Templates/moleculer/Services/index.mustache',
        createServiceIntegrationTestTemplate: './lib/Templates/moleculer/Tests/IntegrationTest.mustache',
        createServiceTemplatePath: './lib/Templates/moleculer/Services/Service.mustache',
        createServiceTestTemplate: './lib/Templates/moleculer/Tests/Service.mustache',
        createInterfaceFolderIndexTemplate: './lib/Templates/moleculer/Interfaces/FolderIndex.mustache',
        createInterfaceIndexInterfaceTemplate: './lib/Templates/moleculer/Interfaces/index.mustache',
        createInterfaceTemplatePath: './lib/Templates/moleculer/Interfaces',
        createRepositoryIndexTemplate: './lib/Templates/moleculer/Repositories/RepoIndex.mustache',
        createRepositoryTemplatePath: './lib/Templates/moleculer/Repositories/Repository.mustache',
        createRepositoryTestTemplatePath: './lib/Templates/moleculer/Tests/Repository.mustache'
    }
};
