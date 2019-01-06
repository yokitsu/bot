import Event from '../structures/event';
import Client from '../structures/client';
import { Message } from 'eris';

export default class MessageCreatedEvent extends Event {
    constructor(client: Client) {
        super(client, 'messageCreate');
    }

    async run(msg: Message) {
        this.client.manager.processor.process(msg);
    }
};