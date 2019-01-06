import Event from '../structures/event';
import Client from '../structures/client';

export default class ShardResumedEvent extends Event {
    constructor(client: Client) {
        super(client, 'shardResume');
    }

    async run(id: number) {
        console.warn(`[Shard #${id}] <=> Shard has resumed.`);
    }
};