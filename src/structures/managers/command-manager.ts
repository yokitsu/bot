import { Collection } from '@maika.xyz/eris-utils';
import { readdir, readdirSync } from 'fs';
import YokitsuClient from '../client';
import Command from '../command';
import CommandProcessor from '../processors/command-processor';

export default class CommandManager {
    public client: YokitsuClient;
    public commands: Collection<string, Command>;
    public processor: CommandProcessor;

    constructor(client: YokitsuClient) {
        this.client = client;
        this.commands = new Collection<string, Command>();
        this.processor = new CommandProcessor(client);
    }

    public async start(): Promise<void> {
        const categories = await readdirSync('./commands');
        for (let i = 0; i < categories.length; i++)
            readdir(`./commands/${categories[i]}`, (error: Error, files: string[]) => {
                if (error)
                    console.error(`[Yokitsu] <=> Couldn't load commands:\n${error.stack}`);

                console.info(`[Yokitsu] <=> Loading ${files.length} commands from category ${categories[i]}`);
                files.forEach(f => {
                    try {
                        const command = require(`../../commands/${categories[i]}/${f}`);
                        const cmd: Command = new command.default(this.client);

                        if (cmd.info.checks && cmd.info.checks.enabled)
                            console.warn(`[Yokitsu] <=> Unable to register "${cmd.info.command}": Command is disabled.`);
                        if (this.commands.has(cmd.info.command))
                            console.warn(`[Yokitsu] <=> Unable to register "${cmd.info.command}": Command was already registered.`);
                        
                        this.commands.set(cmd.info.command, cmd);
                        console.info(`[Yokitsu] <=> Registered command ${cmd.info.command}!`);
                    } catch(ex) {
                        console.error(`[Yokitsu] <=> Unable to register command "${ex.replace('.js', '')}":\n${ex.stack}`);
                    }
                });
            });
    }
};