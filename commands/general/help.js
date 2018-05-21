module.exports = {
    name: 'help',
    aliases: ['h'],
    description: 'Gives extended help on an existing command/alias or documents all commands if none are explicitly stated.',
    category: 'General',
    syntax: 'help [command/alias]',
    execute: (client, msg, args) => {
        if (!args[0]) {
            const categories = {};

            for (const cmd of client.commands) {
                if (!cmd.ownerOnly && !client.config.devs.includes(msg.author.id)) continue;

                let category = categories[cmd.category];

                if (!category) {
                    category = categories[cmd.category] = [];
                }

                category.push(cmd.name);
            }

            msg.channel.send({
                embed: {
                    title: ':pencil: Yokitsu\'s Commands:',
                    description: `To get extended help on an existing command/alias, do \`${client.settings.defaultPrefix}help [command]\`\nTo execute an command, do \`${client.settings.defaultPrefix}<command>\``,
                    fields: Object.keys(categories).map((c) => ({
                        name: `${c} Commands`,
                        value: `\`${categories[c].join("`, `")}\``,
                        inline: true
                    }))
                }
            });
        } else {
            const command = client.commands.find(c => c.name.includes(args[0]) || c.aliases.includes(args[0]));

            try {
                msg.channel.send({
                    embed: {
                        title: `:pencil: Command **${command.name.toString()}**`,
                        description: `Description: **${command.description}**\nSyntax: **\`${client.settings.defaultPrefix}${command.syntax}\`**\nAliases: ${command.aliases ? `**${client.settings.defaultPrefix}${command.aliases.join("**, **")}**` : "**No aliases..**"}`
                    }
                });
            } catch(err) {
                msg.channel.send(`The command or alias \`${args[0]}\` was not found.`);
            }
        }
    }
}