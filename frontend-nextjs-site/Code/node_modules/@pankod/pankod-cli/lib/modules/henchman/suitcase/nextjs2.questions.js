"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// #region Local Imports
const questions = require("./questions/nextjs2");
// #endregion Local Imports
exports.nextjs2 = {
    Page: [
        questions.implementation,
        questions.enterPageName,
        questions.customPath,
        questions.enterRouteName,
        questions.connectStore,
        questions.isHaveReducer,
        questions.addStyle
    ],
    Component: [
        questions.implementation,
        questions.enterComponentName,
        questions.addStyle,
        questions.connectStore,
        questions.isHaveReducer
    ]
    // Plugin: [
    //     questions.addPlugin
    // ]
};
