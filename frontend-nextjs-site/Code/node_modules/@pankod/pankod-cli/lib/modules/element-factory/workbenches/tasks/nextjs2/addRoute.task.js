"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// #region Global Imports
const fs = require("fs");
const path = require("path");
const operations_1 = require("../../operations");
// #region Local Imports
exports.addRoute = (answers, IAddRoutesReplaceParams) => {
    const { hasPath, routePath, fileName, lowerFileName } = answers;
    const templateProps = {
        fileName: fileName.replace(/\b\w/g, foo => foo.toLowerCase()),
        hasPath,
        routePath
    };
    const replaceContentParams = {
        fileDir: IAddRoutesReplaceParams.routesDir,
        filetoUpdate: fs.readFileSync(path.resolve('', IAddRoutesReplaceParams.routesDir), 'utf8'),
        getFileContent: () => operations_1.getTemplate(IAddRoutesReplaceParams.routesTemplate, templateProps),
        message: `Route added to routes.ts as ${hasPath ? `'/${routePath}'` : `'/${lowerFileName}/index'`}`,
        regexKey: /^(?:[\t ]*(?:\r?\n|\r))+export default routes;(?:\n*)/gm
    };
    operations_1.replaceContent(replaceContentParams);
};
