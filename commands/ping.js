module.exports = {
    name: 'ping',
    aliases: ['pong', 'p'],
    description: 'Pings the bot!',
    async execute(client, msg) {
        const message = await msg.channel.send(`Getting ponged by ${msg.author.username}...`);
        const messageTime = message.createdTimestamp - msg.createdTimestamp;
        return message.edit(`Pong!\n\nAPI: ${Math.round(client.ping)}\nMessage: ${messageTime}`);
    }
}
