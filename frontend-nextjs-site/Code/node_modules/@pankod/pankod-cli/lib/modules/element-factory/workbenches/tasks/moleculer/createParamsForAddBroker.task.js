"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// #region Global Imports
const fs = require("fs");
const path = require("path");
// #endregion Global Imports
// #region Local Imports
const operations_1 = require("../../operations");
const moleculer_params_1 = require("../../params/moleculer.params");
// #endregion Local Imports
exports.createParamsForAddBrokerHelper = (type, options) => {
    const { replaceFileDir, brokerHelperCreate, brokerHelperImport } = moleculer_params_1.createServiceParams.brokerHelperTemplatesParams;
    const interoperationPayloads = {
        import: {
            template: brokerHelperImport,
            regexKey: /\/\/(?: |)#endregion Local Imports/g,
            message: 'Service added to BrokerHelper Import'
        },
        create: {
            template: brokerHelperCreate,
            regexKey: /^\s*return broker;/gm,
            message: 'Service added to BrokerHelper setupBroker.\n'
        }
    };
    const replaceBrokerParams = {
        fileDir: replaceFileDir,
        filetoUpdate: fs.readFileSync(path.resolve('', replaceFileDir), 'utf8'),
        getFileContent: () => operations_1.getTemplate(interoperationPayloads[type].template, options),
        message: interoperationPayloads[type].message,
        regexKey: interoperationPayloads[type].regexKey
    };
    return replaceBrokerParams;
};
