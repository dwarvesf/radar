"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// #region Local Imports
const questions = require("./questions/svelte");
// #endregion Local Imports
exports.svelte = {
    Component: [
        questions.componentName,
        questions.hasStyle
    ]
};
