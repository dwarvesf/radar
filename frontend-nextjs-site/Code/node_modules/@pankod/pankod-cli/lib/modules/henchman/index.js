"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// #endregion Global Imports
// #region Local Imports
const suitcase = require("./suitcase");
// #endregion Local Imports
exports.getAllQuestionsAsObject = () => {
    return Object.assign({}, ...Object.values(suitcase));
};
exports.getAllElements = () => {
    return Object.keys(exports.getAllQuestionsAsObject());
};
exports.getUsage = () => exports.getAllElements().map(e => `add ${e}`);
exports.getQuestionsOfProjectElement = (project, element) => {
    return suitcase[project][element];
};
exports.getQuestionByProject = (project) => [
    {
        choices: Object.keys(suitcase[project]),
        message: 'What would you like to add?',
        name: 'selection',
        type: 'list'
    }
];
