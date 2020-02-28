"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// #region Local Imports
const nextjs2_1 = require("./tasks/nextjs2");
// #endregion Local Imports
exports.nextjs2 = (
// TODO: infer to Next2Element to supress can't assign to 'never'
// * passing as Element temporarily
// element: Next2Element,
element, options) => {
    const workbench = {
        Page: () => {
            // TODO: Refactor as ONE method.
            if (options.implementation === 'functional') {
                nextjs2_1.createFuncComponent(Object.assign(Object.assign({}, options), { isPage: true }));
            }
            else {
                nextjs2_1.createClassComponent(Object.assign(Object.assign({}, options), { isPage: true }));
            }
        },
        Component: () => {
            if (options.implementation === 'functional') {
                nextjs2_1.createFuncComponent(options);
            }
            else {
                nextjs2_1.createClassComponent(options);
            }
        }
        // Plugin: () => {
        //     if (options.pluginType) PluginHelper[answers.pluginType]();
        // }
    };
    workbench[element]();
};
