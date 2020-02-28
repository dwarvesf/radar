"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// #region Global Imports
const fs = require("fs");
const path = require("path");
// #endregion Global Imports
// #region Local Imports
const utils_1 = require("../../../../utils");
const validate_operation_1 = require("../validate.operation");
const failsafe_operation_1 = require("../failsafe.operation");
// #endregion Local Imports
describe(utils_1.operations, () => {
    describe('validate.operation', () => {
        describe('checks input and existence for inquirer', () => {
            describe('if filename is valid AND not already created', () => {
                it('should return true', () => {
                    expect(validate_operation_1.validate('nonExistent', './nonExistent/', true, 'default')).toBe(true);
                });
            });
            describe('if filename is valid BUT already created', () => {
                const elementPath = './__temp__/validateOperation/Sample.ts';
                failsafe_operation_1.failsafe(elementPath);
                fs.writeFileSync(path.resolve(elementPath), '');
                it('should return error message', () => {
                    expect(validate_operation_1.validate('sample', './__temp__/validateOperation/', true, 'default')).toContain('already used before');
                });
            });
            describe('if filename is INVALID', () => {
                it('should return error message', () => {
                    expect(validate_operation_1.validate('', '', true, '')).toContain('empty!');
                });
            });
        });
    });
});
