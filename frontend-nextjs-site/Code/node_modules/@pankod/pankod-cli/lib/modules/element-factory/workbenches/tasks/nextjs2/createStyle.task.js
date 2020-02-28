"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const operations_1 = require("../../operations");
const nextjs2_params_1 = require("../../params/nextjs2.params");
// #region Local Imports
exports.createStyle = (options) => {
    const { fileName, lowerFileName, isPage, isStyled, hasStyle } = options;
    if (!hasStyle)
        return;
    const styleParams = isStyled
        ? nextjs2_params_1.createStyledComponentParams
        : nextjs2_params_1.createStyleParams;
    const { templatePath, pageDirPath, compDirPath, pageStyledDirPath } = styleParams;
    if (isPage) {
        if (isStyled) {
            options.target = `${pageStyledDirPath}/${fileName}.ts`;
        }
        else {
            options.target = `${pageDirPath}/${lowerFileName}/style.scss`;
        }
    }
    else {
        options.target = `${compDirPath}/${fileName}/${isStyled ? 'styled.ts' : 'style.scss'}`;
    }
    const writeFileProps = {
        dirPath: options.target,
        getFileContent: () => operations_1.getTemplate(templatePath, options),
        message: 'Added new style file'
    };
    operations_1.writeFile(writeFileProps);
};
