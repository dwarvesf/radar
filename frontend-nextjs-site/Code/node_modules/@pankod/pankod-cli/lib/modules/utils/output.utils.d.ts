declare type Color = 'bgBlue' | 'bgGreen' | 'bgCyan' | 'bgMagenta';
export declare const renderMessage: {
    invalidProject: (project: string) => string;
    invalidElement: (project: string, element: string) => string;
};
export declare const renderDescription: (module: string, description: string, bgColor?: Color) => string;
export declare const operations: string;
export declare const tasks: string;
export declare const tasksNextjs2: string;
export declare const tasksNextjs: string;
export declare const tasksSvelte: string;
export declare const tasksMoleculer: string;
export {};
