"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addStyled = () => {
    console.log('adding styled...');
};
exports.addSass = () => {
    console.log('adding sass...');
};
exports.PluginHelper = {
    sass: exports.addSass,
    styled: exports.addStyled
};
