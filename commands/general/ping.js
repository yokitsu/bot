module.exports = {
    name: 'ping',
    aliases: ['pong', 'p'],
    description: 'Pings the bot!',
    syntax: 'ping',
    category: 'General',
    async execute(client, msg) {
        const message = await msg.channel.send(`Getting ponged by ${msg.author.username}...`);
        const messageTime = message.createdTimestamp - msg.createdTimestamp;
        return message.edit(`:ping_pong: Pong!\n\nAPI: ${Math.round(client.ping)}ms\nMessage: ${messageTime}ms`);
    }
}
