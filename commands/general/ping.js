module.exports = {
    name: 'ping',
    aliases: ['pong', 'p'],
    description: 'Pings the bot!',
    syntax: 'ping',
    category: 'General',
    async execute(client, msg) {
        const message = await msg.channel.send(`Getting ponged by ${msg.author.username}...`);
        const messageTime = message.createdTimestamp - msg.createdTimestamp;
        return message.edit({
            embed: {
                title: `:ping_pong: Pong!`,
                "fields": [
                    {
                        "name": "Gateway",
                        "value": `${Math.round(client.ping)}ms`
                    },
                    {
                        "name": "Message",
                        "value": `${messageTime}ms`
                    }]
                }});
    }
}
