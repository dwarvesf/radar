"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// #region Global Imports
const chalk_1 = require("chalk");
const { bgBlue, bgGreen, bgCyan, bgMagenta, red, bold, italic } = chalk_1.default;
// TODO: Create a better renderer
exports.renderMessage = {
    invalidProject: (project) => {
        return red(`${bold(project)} is NOT a supported project!`);
    },
    invalidElement: (project, element) => {
        const [p, e] = [project, element].map(w => bold(w));
        return red(`${p} projects have no element called ${e} to be created!`);
    }
};
exports.renderDescription = (module, description, bgColor = 'bgBlue') => {
    return `${chalk_1.default[bgColor](bold('[operations]'))} -- ${italic(description)}`;
};
// * Colored Test Descriptions
exports.operations = exports.renderDescription('[operations]', 'fs manipulations');
// * Tasks
exports.tasks = exports.renderDescription('[tasks]', 'scaffolding');
exports.tasksNextjs2 = exports.renderDescription('[tasks > nextjs2]', 'scaffolding elements');
exports.tasksNextjs = exports.renderDescription('[tasks > nextjs]', 'scaffolding elements', 'bgCyan');
exports.tasksSvelte = exports.renderDescription('[tasks > svelte]', 'scaffolding elements', 'bgGreen');
exports.tasksMoleculer = exports.renderDescription('[tasks > moleculer]', 'scaffolding elements', 'bgMagenta');
