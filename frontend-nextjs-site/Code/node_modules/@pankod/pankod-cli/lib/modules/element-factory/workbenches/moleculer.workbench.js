"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// #region Local Imports
const moleculer_1 = require("./tasks/moleculer");
// #endregion Local Imports
exports.moleculer = (
// TODO: infer to MoleculerElement to supress can't assign to 'never'
// * passing as Element temporarily
// element: MoleculerElement,
element, options) => {
    const workbench = {
        Repository: () => {
            moleculer_1.createRepository(options);
        },
        Service: () => {
            moleculer_1.createService(options);
        }
    };
    workbench[element]();
};
