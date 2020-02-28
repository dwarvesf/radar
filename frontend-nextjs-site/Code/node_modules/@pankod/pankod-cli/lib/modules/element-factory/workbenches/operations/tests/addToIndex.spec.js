"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// #region Global Imports
const fs = require("fs");
const path = require("path");
// #endregion Global Imports
// #region Local Imports
const utils_1 = require("../../../../utils");
const addToIndex_operation_1 = require("../addToIndex.operation");
const getTemplate_operation_1 = require("../getTemplate.operation");
const writeFile_operation_1 = require("../writeFile.operation");
const failsafe_operation_1 = require("../failsafe.operation");
// #endregion Local Imports
const realFS = jest.requireActual('fs');
describe(utils_1.operations, () => {
    describe('addToIndex.operation', () => {
        const templatePath = './lib/Templates/nextjs/Components/index.mustache';
        beforeAll(() => {
            failsafe_operation_1.failsafe(templatePath);
            writeFile_operation_1.writeFile({
                dirPath: templatePath,
                getFileContent: () => realFS.readFileSync(templatePath),
                message: 'Component index created into memory.'
            });
        });
        it('should append index.ts and match snapshot.', () => {
            const params = {
                dirPath: `./__temp__/elements/index.ts`,
                getFileContent: () => {
                    return getTemplate_operation_1.getTemplate(path.resolve(templatePath), {
                        fileName: 'Test'
                    });
                },
                message: 'addToIndex.operation works!'
            };
            addToIndex_operation_1.addToIndex(params);
            const created = fs.readFileSync(params.dirPath, 'utf8');
            expect(created).toMatchInlineSnapshot(`
                "export { default as Test } from '@Components/Test';
                "
            `);
        });
    });
});
