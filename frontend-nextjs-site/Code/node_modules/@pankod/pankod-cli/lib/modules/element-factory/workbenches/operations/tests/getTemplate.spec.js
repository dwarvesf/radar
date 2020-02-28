"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// #region Global Imports
const path = require("path");
const chalk_1 = require("chalk");
const logSymbols = require("log-symbols");
// #endregion Global Imports
// #region Local Imports
const utils_1 = require("../../../../utils");
const getTemplate_operation_1 = require("../getTemplate.operation");
const writeFile_operation_1 = require("../writeFile.operation");
const failsafe_operation_1 = require("../failsafe.operation");
// #endregion Local Imports
const realFS = jest.requireActual('fs');
describe(utils_1.operations, () => {
    const existent = './lib/Templates/nextjs/Components/index.mustache';
    const nonExistent = './non-existent/non-existent.mustache';
    beforeAll(() => {
        failsafe_operation_1.failsafe(existent);
        writeFile_operation_1.writeFile({
            dirPath: existent,
            getFileContent: () => realFS.readFileSync(existent, 'utf-8'),
            message: 'Component index created into memory.'
        });
    });
    describe('getTemplate.operation', () => {
        const render = (template) => {
            return getTemplate_operation_1.getTemplate(path.resolve(template), { fileName: 'Test' });
        };
        it('should template with passed model', () => {
            expect(render(existent)).toMatchInlineSnapshot(`
                "export { default as Test } from '@Components/Test';
                "
            `);
        });
        it('should log error if given path is non-existent', () => {
            try {
                render(nonExistent);
            }
            catch (error) {
                console.info(chalk_1.default.green(logSymbols.success, 'getTemplate.operation works!'));
                expect(error).toBeDefined();
            }
        });
    });
});
