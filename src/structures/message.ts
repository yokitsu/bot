import Client from './client';
import { Guild, User, Message, TextChannel } from 'eris';
import { EmbedObject } from '@maika.xyz/eris-utils';

export default class CommandMessage {
    public client: Client;
    public message: Message;
    public args: string[];
    public guild: Guild;
    public sender: User;

    constructor(client: Client, message: Message, args: string[]) {
        this.client = client;
        this.message = message;
        this.args = args;
        this.sender = message.author;
        this.guild = (message.channel as TextChannel).guild;
    }

    public async reply(content: string): Promise<Message> {
        return this
            .message
            .channel
            .createMessage(content);
    }

    public async embed(content: EmbedObject): Promise<Message> {
        return this
            .message
            .channel
            .createMessage({ embed: content });
    }
};