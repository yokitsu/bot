import mongoose from 'mongoose';
import Client from '../client';
import GuildModel from '../../models/guild';

export default class DatabaseManager {
    public client: Client;
    public uri: string;

    constructor(client: Client) {
        this.client = client;
        this.uri = process.env.DB_URL || 'mongodb://localhost:27017/Yokitsu';
    }

    public async connect() {
        mongoose.Promise = global.Promise;
        await mongoose.connect(this.uri, { useNewUrlParser: true });
        mongoose
            .connection
            .on('open', () => console.log('[Yokitsu] <=> Connected to MongoDB'))
            .on('error', (error: Error) => console.error(`[Yokitsu] <=> An error while connecting to MongoDB: ${error.stack}`));
        mongoose.model('guilds', GuildModel, 'guilds');
    }
}