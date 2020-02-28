"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// #region Local Imports
const suitcase = require("../henchman/suitcase");
const _1 = require(".");
// #endregion Local Imports
exports.validateProject = function (project) {
    if (!suitcase.hasOwnProperty(project)) {
        this.error(_1.renderMessage.invalidProject(project));
    }
};
exports.validateCommand = function (element, project) {
    if (!suitcase[project].hasOwnProperty(element)) {
        this.error(_1.renderMessage.invalidElement(project, element));
    }
};
