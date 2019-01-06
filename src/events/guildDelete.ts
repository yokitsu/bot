import Event from '../structures/event';
import Client from '../structures/client';
import { Guild } from 'eris';

export default class GuildLeftEvent extends Event {
    constructor(client: Client) {
        super(client, 'guildDelete');
    }

    async run(guild: Guild) {
        console.info(`[Yokitsu] <=> Left guild ${guild.name} (${guild.id})`);
    }
}