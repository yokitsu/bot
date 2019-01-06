import CommandMessage from '../message';
import YokitsuClient from '../client';
import { Message } from 'eris';

export default class CommandProcessor {
    public client: YokitsuClient;

    constructor(client: YokitsuClient) {
        this.client = client;
    }

    public async process(msg: Message) {
        if (msg.author.bot)
            return;

        let prefix;
        const mention = new RegExp(`^<@!?${this.client.user.id}> `).exec(msg.content);
        const prefixes = [`${mention}`, (process.env.YOKITSU_PREFIX) as string];

        for (const i of prefixes) 
            if (msg.content.startsWith(i)) 
                prefix = i;

        if (!prefix)
            return;

        const args = msg.content.slice(prefix.length).trim().split(/ +/g);
        const commandName = args.shift();
        const command = this.client.manager.commands.filter(s => s.info.command === commandName || (s.info.aliases as string[]).includes(commandName as string));
        const ctx = new CommandMessage(this.client, msg, args);

        if (command.length > 0) {
            if (
                (command[0].info.checks) && 
                command[0].info.checks.guild && 
                msg.channel.type === 1
            ) ctx.reply(`Unable to run the command ${command[0].info.command}; you're not in a guild!`);

            if (
                (command[0].info.checks) && 
                command[0].info.checks.owner 
                && !(process.env.OWNERS as string).split(',').includes(ctx.sender.id)
            ) ctx.reply(`Unable to run command ${command[0].info.command}; you're not my owners...`);

            try {
                await command[0].run(ctx);
            } catch(ex) {
                const embed = this.client.getEmbed();
                embed
                    .setDescription(`Unable to run command \`${command[0].info.command}\`:\n\`\`\`js\n${ex.message}\`\`\`\nJoin **<https://discord.gg/9Qu7aXe>** and report it!`)
                    .setTimestamp();
                ctx.embed(embed.build());
            }
        }
    }
}