import Client from './client';
import CommandInfo from './types/command-info';
import CommandMessage from './message';

export default class YokitsuCommand {
    public client: Client;
    public info: CommandInfo;
    
    constructor(client: Client, info: CommandInfo) {
        this.client = client;
        this.info = info;
    }

    public async run(msg: CommandMessage): Promise<void> {
        throw new SyntaxError("Unable to run command; it doesn't have a run(msg: Yokitsu.CommandMessage) function overidden. :(");
    }
};