const { RichEmbed } = require('discord.js');

module.exports = {
    name: 'invite', 
    aliases: ['inv', 'support'],
    description: 'Gives you the support server or bot invite',
    execute(client, msg) {
        const embed = new RichEmbed()
        .setTitle('Invite Wizard')
        .setColor('RANDOM')
        .setDescription('Type `support` or `s` for the support server | Type `bot` or `b` for the bot\'s invite')
        msg.channel.send({ embed })
            .then(() => {
                msg.channel.awaitMessages(response => ['s', 'b', 'support', 'bot'].includes(response.content.toLowerCase()), { 
                    max: 1,
                    time: 60000,
                    errors: ['time'],
                })
                .then((c) => {
                    if(c.first().content.toLowerCase().includes('s' || 'support')) {
                        const embed = new RichEmbed()
                        .setTitle('Support Server')
                        .setColor('RANDOM')
                        .setDescription('Support for QuoteBot can be found [here](https://discord.gg/9Qu7aXe)')
                        msg.channel.send({ embed });
                    } else if(c.first().content.toLowerCase().includes('b' || 'bot')) {
                        const embed = new RichEmbed()
                        .setTitle('Bot Invite')
                        .setColor('RANDOM')
                        .setDescription('[My invite](https://discordapp.com/api/oauth2/authorize?client_id=445511270654017536&permissions=0&scope=bot)')
                        msg.channel.send({ embed });
                    }
                })
                .catch(() => {
                    msg.channel.send('Your 1 minute (60000ms) is up. If you\'d like to try again, please retype the command.');
                });
            });
    }
}