"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// #region Global Imports
const fs = require("fs");
const path = require("path");
// #endregion Global Imports
// #region Local Imports
const utils_1 = require("../../../../utils");
const isAlreadyExist_operation_1 = require("../isAlreadyExist.operation");
const failsafe_operation_1 = require("../failsafe.operation");
// #endregion Local Imports
describe(utils_1.operations, () => {
    describe('isAlreadyExist.operation', () => {
        const startPath = './__temp__/isAlreadyExist/agrees/';
        // * Creates directories and files for truthy samples
        beforeAll(() => {
            const sampleFolders = ['sample/', 'DefaultIsFileFalse/'];
            const sampleFiles = ['sample.service.ts', 'DefaultIsFileTrue.ts'];
            failsafe_operation_1.failsafe(startPath);
            sampleFolders.forEach(folder => {
                fs.mkdirSync(path.resolve(startPath, folder));
            });
            sampleFiles.forEach(file => {
                fs.writeFileSync(path.resolve(startPath, file), '');
            });
        });
        const subjects = [
            {
                startPath,
                val: 'sample',
                isFile: false,
                fileType: 'page'
            },
            {
                startPath,
                val: 'sample',
                isFile: false,
                fileType: 'service'
            },
            {
                startPath,
                val: 'defaultIsFileTrue',
                isFile: true,
                fileType: 'default'
            },
            {
                startPath,
                val: 'defaultIsFileFalse',
                isFile: false,
                fileType: 'default'
            }
        ];
        describe('checks existence and returns boolean', () => {
            it('should agree on existence', () => {
                subjects.forEach((_a) => {
                    var { startPath } = _a, rest = tslib_1.__rest(_a, ["startPath"]);
                    expect(isAlreadyExist_operation_1.isAlreadyExist(startPath, ...Object.values(rest))).toBeTruthy();
                });
            });
            it('should deny existence', () => {
                subjects
                    .map(s => (Object.assign(Object.assign({}, s), { val: `${s.val}_notExistent` })))
                    .forEach((_a) => {
                    var { startPath } = _a, rest = tslib_1.__rest(_a, ["startPath"]);
                    expect(isAlreadyExist_operation_1.isAlreadyExist(startPath, ...Object.values(rest))).toBeFalsy();
                });
            });
        });
    });
});
