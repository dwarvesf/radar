"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk = require("chalk");
const figlet = require("figlet");
const utils_1 = require("../../modules/utils");
const text = {
    moleculer: 'Pankod Moleculer CLI',
    nextjs: 'Pankod NextJS CLI',
    svelte: 'Pankod Svelte CLI',
    nextjs2: 'Pankod NextJS CLI',
    pankodCli: 'Pankod CLI'
};
const hook = async function () {
    const pankodConfig = utils_1.getPankodConfig();
    if (!pankodConfig) {
        this.error('Please specify pankod.project in package.json');
        this.exit(1);
    }
    const project = pankodConfig.project || pankodConfig.projectType;
    process.stdout.write(chalk.default(figlet.textSync(text[project])) + '\n');
};
exports.default = hook;
