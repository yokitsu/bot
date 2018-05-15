module.exports = {
    name: 'ping',
    aliases: ['pong', 'p'],
    description: 'Pings the bot!',
    execute(client, msg) {
        msg.channel.send(`Getting ponged by ${msg.author.username}...`).then(res => {
            res.edit(`Pong!\n\nAPI: ${Math.round(client.ping)}ms\nMessage: ${res.createdTimestamp - msg.createdTimestamp}ms`);
        });
    }
}