import Event from '../event';
import YokitsuClient from '../client';

export default class EventProcessor {
    public client: YokitsuClient;

    constructor(client: YokitsuClient) {
        this.client = client;
    }

    public async process(event: Event) {
        const func = async(...args) => {
            try {
                await event.run(...args);
            } catch(ex) {
                console.error(`[Yokitsu] <=> An error occured while running the ${event.event} event:\n${ex.stack}`);
            }
        };

        this.client.on(event.event, func);
    }
}