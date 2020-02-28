"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// #region Local Imports
const paths = require("../../../paths");
// #endregion Local Imports
exports.createComponentParams = {
    componentsDir: paths.svelte.componentsDir,
    templatePath: paths.svelte.templates.componentTemplate
};
exports.createStyleParams = {
    compDirPath: paths.svelte.componentsDir,
    templatePath: paths.svelte.templates.stylePageTemplate
};
exports.createTestParams = {
    compDirPath: paths.svelte.componentsDir,
    templatePath: paths.svelte.templates.componentTestTemplate
};
