"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// #region Global Imports
const fs = require("fs");
// #endregion Local Imports
exports.getPankodConfig = () => {
    const config = JSON.parse(String(fs.readFileSync('./package.json')));
    return config.pankod;
};
exports.hasPlugin = (pluginName) => {
    const plugins = exports.getPankodConfig().plugins;
    return plugins.includes(pluginName);
};
