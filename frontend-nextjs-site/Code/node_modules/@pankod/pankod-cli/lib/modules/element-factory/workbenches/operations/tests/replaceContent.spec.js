"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// #region Global Imports
const fs = require("fs");
const path = require("path");
// #endregion Global Imports
// #region Local Imports
const replaceContent_operation_1 = require("../replaceContent.operation");
const failsafe_operation_1 = require("../failsafe.operation");
const utils_1 = require("../../../../utils");
// #endregion Local Imports
describe(utils_1.operations, () => {
    describe('replaceContent.operation', () => {
        it('should replace regexp matchings with passed contents.', () => {
            const sample = './__temp__/replaceContent/target.ts';
            const sampleContent = '// ! I was just sitting here in silence...';
            failsafe_operation_1.failsafe(sample);
            fs.writeFileSync(path.resolve(sample), sampleContent);
            const params = {
                fileDir: sample,
                filetoUpdate: sampleContent,
                regexKey: /\/\/ ! I was just sitting here in silence.../g,
                getFileContent: () => `${sampleContent}\nThen piston dropped!`,
                message: 'replaceContent.operation works!'
            };
            replaceContent_operation_1.replaceContent(params);
            expect(fs.readFileSync(path.resolve(sample), 'utf8'))
                .toMatchInlineSnapshot(`
                "// ! I was just sitting here in silence...
                Then piston dropped!"
            `);
        });
    });
});
