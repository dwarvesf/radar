"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// #region Local Imports
const questions = require("./questions/nextjs");
// #endregion Local Imports
exports.nextjs = {
    ClassComponent: [
        questions.enterComponentName,
        questions.connectStore,
        questions.isHaveReducer,
        questions.addStyle
    ],
    FunctionalComponent: [
        questions.enterComponentName,
        questions.addStyle
    ],
    Page: [
        questions.enterPageName,
        questions.customPath,
        questions.routeName,
        questions.connectStore,
        questions.isHaveReducer,
        questions.addStyle
    ],
    Plugin: [
        questions.plugin
    ]
};
