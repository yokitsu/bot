import { Client } from 'eris';
import CommandManager from './managers/command-manager';
import EventManager from './managers/event-manager';
import { MessageEmbed } from '@maika.xyz/eris-utils';

export default class YokitsuClient extends Client {
    public manager: CommandManager;
    public events: EventManager
    
    constructor() {
        super(process.env.YOKITSU_TOKEN as string, {
            maxShards: 'auto',
            disableEveryone: true
        });

        this.manager = new CommandManager(this);
        this.events = new EventManager(this);
    }

    public getEmbed(): MessageEmbed {
        return new MessageEmbed()
            .setAuthor('Yokitsu', this.user.avatarURL, 'https://yokitsu.xyz')
            .setColor('random');
    }

    public getCommandManager(): CommandManager {
        return this.manager;
    }

    public async start(): Promise<void> {
        this.manager.start();
        this.events.start();
        await super.connect()
            .then(() => console.log('Yokitsu is currently connecting via WS...'));
    }
};