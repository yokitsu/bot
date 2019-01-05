import Event from '../event';
import Client from '../client';
import { readdir } from 'fs';

export default class EventManager {
    public client: Client;

    constructor(client: Client) {
        this.client = client;
    }

    public async start(): Promise<void> {
        readdir('./events', (error: Error, files: string[]) => {
            if (error)
                console.warn(`[Yokitsu] <=> Unable to load events: ${error.message}\n${error.stack}`);

            console.info(`[Yokitsu] <=> Loading ${files.length} events!`);
            files.forEach(f => {
                const event = require(`../../events/${f}`);
                const ev: Event = new event.default(this.client);

                // this.processor.process(ev);
            });
        });
    }
}