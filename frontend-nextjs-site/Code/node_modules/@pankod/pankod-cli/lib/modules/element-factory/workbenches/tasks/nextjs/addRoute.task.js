"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// #region Global Imports
const fs = require("fs");
const path = require("path");
const operations_1 = require("../../operations");
// #endregion Local Imports
exports.addRoute = (answers, IAddRoutesReplaceParams) => {
    const { hasPath = false, routePath, fileName } = answers;
    const templateProps = {
        fileName: fileName.replace(/\b\w/g, foo => foo.toLowerCase()),
        hasPath,
        routePath
    };
    const replaceContentParams = {
        fileDir: IAddRoutesReplaceParams.routesDir,
        filetoUpdate: fs.readFileSync(path.resolve('', IAddRoutesReplaceParams.routesDir), 'utf8'),
        getFileContent: () => operations_1.getTemplate(IAddRoutesReplaceParams.routesTemplate, templateProps),
        message: `Route added to routes.js as ${hasPath ? `'/${routePath}'` : `'/${fileName}/index'`}`,
        regexKey: /^(?:[\t ]*(?:\r?\n|\r))+module.exports = routes;/gm
    };
    operations_1.replaceContent(replaceContentParams);
};
