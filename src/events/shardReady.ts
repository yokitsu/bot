import Event from '../structures/event';
import Client from '../structures/client';

export default class ShardConnectedEvent extends Event {
    constructor(client: Client) {
        super(client, 'shardReady');
    }

    async run(id: number) {
        console.warn(`[Shard #${id}] <=> Shard has logged into Discord!`);
    }
};