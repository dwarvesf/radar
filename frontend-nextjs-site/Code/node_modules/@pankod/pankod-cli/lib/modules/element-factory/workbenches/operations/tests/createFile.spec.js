"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// #region Global Imports
const fs = require("fs");
const path = require("path");
// #endregion Global Imports
// #region Local Imports
const createFile_operation_1 = require("../createFile.operation");
const utils_1 = require("../../../../utils");
// #endregion Local Imports
describe(utils_1.operations, () => {
    describe('createFile.operation', () => {
        it('should create directory', () => {
            const dirPath = './__temp__/createFileOperation/generated/this';
            createFile_operation_1.createFile(dirPath);
            const isExist = fs.existsSync(path.resolve(dirPath));
            expect(isExist).toBeTruthy();
        });
    });
});
