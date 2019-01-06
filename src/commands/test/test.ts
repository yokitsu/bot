import Command from '../../structures/command';
import CommandMessage from '../../structures/message';
import YokitsuClient from '../../structures/client';

export default class TestCommand extends Command {
    constructor(client: YokitsuClient) {
        super(client, {
            command: 'test',
            description: (client: YokitsuClient) => `Test if ${client.user.username}'s command processor works.`,
            usage: '<..args>',
            aliases: ['debug'],
            category: 'Test'
        });
    }

    async run(msg: CommandMessage) {
        msg.reply(`:white_check_mark: **${this.client.user.username}** is currently working.`);
    }
};