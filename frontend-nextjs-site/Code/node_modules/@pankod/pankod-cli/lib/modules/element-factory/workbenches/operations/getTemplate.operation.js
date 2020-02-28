"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// #region Global Imports
const fs = require("fs");
const path = require("path");
const mustache = require("mustache");
const chalk_1 = require("chalk");
// #endregion Local Imports
const { red, bold } = chalk_1.default;
exports.getTemplate = (templatePath, templateProps) => {
    // * __dirname + ../../../../../ path is root of project.
    const pathToTemplate = path.resolve(__dirname, '../../../../../', templatePath);
    if (!fs.existsSync(pathToTemplate)) {
        throw red(`Could NOT find the template with given path ${bold(pathToTemplate)}`);
    }
    return mustache.render(fs.readFileSync(pathToTemplate, 'utf8'), templateProps);
};
