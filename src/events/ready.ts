import Event from '../structures/event';
import Client from '../structures/client';

export default class ReadyEvent extends Event {
    constructor(client: Client) {
        super(client, 'ready');
    }

    async run() {
        console.info(`[Yokitsu] <=> Yokitsu has connected to Discord with ${this.client.guilds.size} guilds.`);
        this.client.editStatus('online', {
            name: `${(process.env.YOKITSU_PREFIX as string)}help | ${this.client.guilds.size} Guild${this.client.guilds.size > 1 ? 's' : ''}`
        });
    }
};