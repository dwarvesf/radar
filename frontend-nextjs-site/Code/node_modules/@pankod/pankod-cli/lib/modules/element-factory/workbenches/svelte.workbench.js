"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// #region Local Imports
const svelte_1 = require("./tasks/svelte");
// #endregion Local Imports
exports.svelte = (
// TODO: infer to SvelteElement to supress can't assign to 'never'
// * passing as Element temporarily
// element: SvelteElement,
element, options) => {
    const workbench = {
        Component: () => {
            svelte_1.createComponent(options);
        }
    };
    workbench[element]();
};
