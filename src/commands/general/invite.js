const { MessageEmbed } = require('discord.js');

module.exports = {
    help: {
        command: 'invite',
        description: 'Gives Yokitsu\'s support server and bot invite',
        syntax: 'invite',
        aliases: ['support']
    },
    config: {
        disabled: false,
        ownerOnly: false,
        guildOnly: false
    },
    execute: (bot, msg) => {
        const embed = new MessageEmbed()
        .setTitle('Yokitsu Invite and Support Server')
        .addField('Invite', '[Here](https://discordapp.com/oauth2/authorize?client_id=445511270654017536&permissions=0&scope=bot)')
        .addField('Support Server', '[Here](https://discord.gg/9Qu7aXe)')

        msg.channel.send({ embed });
    }
}