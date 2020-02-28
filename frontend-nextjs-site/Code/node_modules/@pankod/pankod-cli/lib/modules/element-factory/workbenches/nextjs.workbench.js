"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// #region Local Imports
const nextjs_1 = require("./tasks/nextjs");
// #endregion Local Imports
exports.nextjs = (
// TODO: infer to NextElement to supress can't assign to 'never'
// * passing as Element temporarily
// element: NextElement,
element, options) => {
    const workbench = {
        Page: () => {
            nextjs_1.createClassComponent(Object.assign(Object.assign({}, options), { isPage: true }));
        },
        ClassComponent: () => {
            nextjs_1.createClassComponent(options);
        },
        FunctionalComponent: () => {
            nextjs_1.createFuncComponent(Object.assign(Object.assign({}, options), { isFuncComponent: true }));
        }
        // Plugin: () => {
        //     if (options.pluginType) PluginHelper[options.pluginType]();
        // }
    };
    workbench[element]();
};
