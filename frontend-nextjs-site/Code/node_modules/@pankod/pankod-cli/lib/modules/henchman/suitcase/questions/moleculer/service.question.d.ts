import * as inquirer from 'inquirer';
import { ICommon } from '../../../../typings';
export declare const serviceName: inquirer.InputQuestion<ICommon.IAnswers>;
export declare const isPrivate: inquirer.ConfirmQuestion<ICommon.IAnswers>;
export declare const hasDatabase: inquirer.ConfirmQuestion<ICommon.IAnswers>;
