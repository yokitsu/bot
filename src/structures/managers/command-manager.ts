import { Collection } from '@maika.xyz/eris-utils';
import { readdir, readdirSync } from 'fs';
import YokitsuClient from '../client';
import Command from '../command';

export default class CommandManager {
    public client: YokitsuClient;
    public commands: Collection<string, Command>;
    constructor(client: YokitsuClient) {
        this.client = client;
        this.commands = new Collection<string, Command>();
    }
};