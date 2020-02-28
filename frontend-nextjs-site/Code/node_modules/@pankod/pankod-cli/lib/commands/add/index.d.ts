import { Command } from '@oclif/command';
export default class Add extends Command {
    static description: string;
    static args: {
        name: string;
        options: string[];
    }[];
    static usage: string[];
    run(): Promise<void>;
}
