import * as inquirer from 'inquirer';
import { ICommon } from '../../../../typings';
export declare const addStyle: inquirer.ConfirmQuestion<ICommon.IAnswers>;
export declare const connectStore: inquirer.ConfirmQuestion<ICommon.IAnswers>;
export declare const enterComponentName: inquirer.InputQuestion<ICommon.IAnswers>;
export declare const isHaveReducer: inquirer.ListQuestion<ICommon.IAnswers>;
