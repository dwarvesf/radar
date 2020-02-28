"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const operations_1 = require("../../operations");
// #endregion Local Imports
exports.createStyle = (answers, createStyleParams) => {
    const { fileName, isPage = false, lowerFileName } = answers;
    const templateProps = { fileName, lowerFileName };
    const pageDirPath = `${createStyleParams.pageDirPath}/${answers.fileName.replace(/\b\w/g, foo => foo.toLowerCase())}/style.scss`;
    const compDirPath = `${createStyleParams.compDirPath}/${answers.fileName}/style.scss`;
    const writeFileProps = {
        dirPath: isPage ? pageDirPath : compDirPath,
        getFileContent: () => operations_1.getTemplate(createStyleParams.templatePath, templateProps),
        message: 'Added new style file'
    };
    operations_1.writeFile(writeFileProps);
};
