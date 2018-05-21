const { RichEmbed } = require('discord.js');

module.exports = {
    name: 'help',
    aliases: ['h'],
    description: 'Documentation of commands',
    execute(client, msg) {
        let args = msg.content.split(/ +/).slice(2).join(/ +/);

        // If no arguments are provided, list all categories
        if(!args[0]) {
            const embed = new RichEmbed()
            .setTitle('List of Available Categories')
            .setColor('RANDOM')
            .setDescription(`<:awau:447317308122202123> General - \`${client.settings.defaultPrefix}help general\`\n🎉 Fun - \`${client.settings.defaultPrefix}help fun\`\n🔨 Moderation - \`${client.settings.defaultPrefix}help mod\`\n📜 Logging - \`${client.settings.defaultPrefix}help log\`\n🛠 Utility - \`${client.settings.defaultPrefix}help util\`\n⚙ Per-server settings - \`${client.settings.defaultPrefix}help settings\``)
            // .setFooter(`Use '${client.settings.defaultPrefix}help <category>' to obtain a command list for that category.\nDo not include the emotes when typing out '${client.settings.defaultPrefix}help <category>'.\nExample: '${client.settings.defaultPrefix}help general' (Note: you can also capitalise the first letter of the category name)`)
        
            return msg.channel.send({ embed });
        }
        
        switch(args[0]) {
            case 'general':
            case 'General':
                const embed = new RichEmbed()
                .setTitle('General Commands')
                .setDescription(`__**${client.settings.defaultPrefix}ping**__\nPong!\n\n__**${client.settings.defaultPrefix}invite**__\nSends Yokitsu's invite wizard\n\n__**${client.settings.defaultPrefix}help**__\nSends this message!`);
                
                msg.channel.send({ embed });
                break;
            case 'fun':
            case 'Fun':
                return msg.channel.send('Fun commands soon™');
                break;
            case 'mod':
            case 'Mod':
                return msg.channel.send('Mod commands soon™');
                break;
            case 'log':
            case 'Log':
                return msg.channel.send('Logging-related settings/commands soon™');
                break;
            case 'util':
            case 'Util':
                return msg.channel.send('Util commands soon™');
                break;
            case 'settings':
            case 'Settings':
                return msg.channel.send('Settings soon™');
                break;
            default:
                return msg.channel.send('Non-existent category');
        }
    }
}
