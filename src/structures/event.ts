import Client from './client';
import IEvent from './types/event-info';

export default class YokitsuEvent {
    public client: Client;
    public event: IEvent;

    constructor(client: Client, event: IEvent) {
        this.client = client;
        this.event = event;
    }

    public async run(...args: any[]): Promise<void> {}
};