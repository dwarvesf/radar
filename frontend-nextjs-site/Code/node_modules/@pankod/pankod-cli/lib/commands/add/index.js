"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// #region Global Imports
const command_1 = require("@oclif/command");
const inquirer = require("inquirer");
const element_factory_1 = require("../../modules/element-factory");
const henchman_1 = require("../../modules/henchman");
const utils_1 = require("../../modules/utils");
// #endregion Local Imports
class Add extends command_1.Command {
    async run() {
        const { project: newKey, projectType: oldKey } = utils_1.getPankodConfig();
        const project = newKey || oldKey;
        // ? bind(this) or pass this.error
        utils_1.validateProject.bind(this, project)();
        let { args: { element } } = this.parse(Add);
        if (element) {
            // ? bind(this) or pass this.error
            utils_1.validateCommand.bind(this, element, project)();
        }
        else {
            const whichElement = henchman_1.getQuestionByProject(project);
            const { selection } = await inquirer.prompt(whichElement);
            // TODO: Create workbenches own interfaces for IAnswer
            // * Just skipping type check
            if (selection)
                element = selection;
        }
        await element_factory_1.produce(project, element);
    }
}
exports.default = Add;
Add.description = 'Add services, components and more...';
Add.args = [
    {
        name: 'element',
        options: henchman_1.getAllElements()
    }
];
Add.usage = henchman_1.getUsage();
