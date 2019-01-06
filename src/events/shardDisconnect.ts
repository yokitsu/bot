import Event from '../structures/event';
import Client from '../structures/client';

export default class ShardDisconnectedEvent extends Event {
    constructor(client: Client) {
        super(client, 'shardDisconnect');
    }

    async run(error: Error, id: number) {
        console.warn(`[Shard #${id}] <=> Shard has disconnected!\n${error.stack}`);
    }
};