"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// #region Global Imports
const fs = require("fs");
const path = require("path");
// #endregion Global Imports
// #region Local Imports
const utils_1 = require("../../../../utils");
const writeFile_operation_1 = require("../writeFile.operation");
// #endregion Local Imports
describe(utils_1.operations, () => {
    describe('writeFile.operation', () => {
        it('should create file with passed contents.', () => {
            const params = {
                dirPath: './__temp__/writeFileOperation/wrote/this-just.now',
                getFileContent: () => '// * writeFile.operation created this!',
                message: 'writeFile.operation works!'
            };
            writeFile_operation_1.writeFile(params);
            const content = fs.readFileSync(path.resolve(params.dirPath), 'utf8');
            expect(content).toBeDefined();
            expect(content).toBe(params.getFileContent());
        });
    });
});
