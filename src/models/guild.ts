import { Schema } from 'mongoose';
export default new Schema({
    guildID: {
        type: String,
        default: undefined
    },
    prefix: {
        type: String,
        default: (process.env.YOKITSU_PREFIX) as string
    }
});