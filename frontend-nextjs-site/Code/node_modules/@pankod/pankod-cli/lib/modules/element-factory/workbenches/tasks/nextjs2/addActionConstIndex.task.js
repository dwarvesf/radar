"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// #region Global Imports
const fs = require("fs");
const path = require("path");
const operations_1 = require("../../operations");
// #region Local Imports
exports.addActionConstIndex = (templateProps, params) => {
    const { actionConstTemplatePath, actionConstsFileDir } = params;
    const replaceContentParams = {
        fileDir: actionConstsFileDir,
        filetoUpdate: fs.readFileSync(path.resolve('', actionConstsFileDir), 'utf8'),
        getFileContent: () => operations_1.getTemplate(actionConstTemplatePath, templateProps),
        message: 'Action constants added to Definitions/ActionConsts/ActionConsts.ts',
        regexKey: /export const ActionConsts\s[=]\s[{]/g
    };
    operations_1.replaceContent(replaceContentParams);
};
