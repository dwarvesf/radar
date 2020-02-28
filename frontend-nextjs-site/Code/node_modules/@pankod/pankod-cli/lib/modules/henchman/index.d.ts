import * as inquirer from 'inquirer';
import { ICommon } from '../typings';
export declare const getAllQuestionsAsObject: () => any;
export declare const getAllElements: () => string[];
export declare const getUsage: () => string[];
export declare const getQuestionsOfProjectElement: (project: ICommon.Project, element: ICommon.Element) => inquirer.QuestionCollection<ICommon.IAnswers>;
export declare const getQuestionByProject: (project: ICommon.Project) => inquirer.QuestionCollection<ICommon.IAnswers>;
