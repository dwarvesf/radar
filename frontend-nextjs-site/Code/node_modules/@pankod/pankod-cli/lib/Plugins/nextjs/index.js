"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("./helpers");
const plugins = {
    sass: helpers_1.addSass,
    styled: helpers_1.addStyled
};
exports.default = {
    addPlugin: async (pluginName) => {
        plugins[pluginName]();
    }
};
