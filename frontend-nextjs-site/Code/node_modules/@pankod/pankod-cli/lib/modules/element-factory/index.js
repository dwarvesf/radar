"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// #region Global Imports
const inquirer = require("inquirer");
// #region Global Imports
// #region Local Imports
const factory = require("./workbenches");
const henchman_1 = require("../henchman");
// #endregion Local Imports
const prepareOptions = (answers) => {
    const capitalizedName = answers.fileName.replace(/\b\w/g, f => f.toUpperCase());
    const unCapitalizedName = answers.fileName.replace(/\b\w/g, f => f.toLowerCase());
    return Object.assign(Object.assign({}, answers), { fileName: capitalizedName, 
        // TODO: Rename 'upperFileName' as 'capitalizedFileName'
        upperFileName: capitalizedName, lowerFileName: unCapitalizedName, interfaceName: `I${capitalizedName}` });
};
exports.produce = async (project, element) => {
    const questions = henchman_1.getQuestionsOfProjectElement(project, element);
    const answers = await inquirer.prompt(questions);
    const options = prepareOptions(answers);
    factory[project](element, options);
};
