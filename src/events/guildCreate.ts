import Event from '../structures/event';
import Client from '../structures/client';
import { Guild } from 'eris';

export default class GuildJoinedEvent extends Event {
    constructor(client: Client) {
        super(client, 'guildCreate');
    }

    async run(guild: Guild) {
        console.info(`[Yokitsu] <=> Joined guild ${guild.name} (${guild.id})`);
    }
};