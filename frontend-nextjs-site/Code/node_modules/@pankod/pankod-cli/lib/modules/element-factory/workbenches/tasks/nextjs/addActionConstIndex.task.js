"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// #region Global Imports
const fs = require("fs");
const path = require("path");
const operations_1 = require("../../operations");
const paths_1 = require("../../../../paths");
// #endregion Local Imports
exports.addActionConstIndex = (templateProps, params) => {
    const { actionConstTemplatePath } = params;
    const replaceContentParams = {
        fileDir: `${paths_1.nextjs.definitionsDir}/ActionConsts.ts`,
        filetoUpdate: fs.readFileSync(path.resolve('', `${paths_1.nextjs.definitionsDir}/ActionConsts.ts`), 'utf8'),
        getFileContent: () => operations_1.getTemplate(actionConstTemplatePath, templateProps),
        message: 'Action constants added to Definitions/ActionConsts.ts',
        regexKey: /export const ActionConsts\s[=]\s[{]/g
    };
    operations_1.replaceContent(replaceContentParams);
};
