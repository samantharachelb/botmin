import { Schema, model } from 'mongoose';

let schema = new Schema({
    discord_info: {
        id: String,
        known_names: [String],
        date_created: Date
    },
    facebook_info: {
        name: String,
        link: String,
    },
    status: {
        state: String,
        reason: String
    }
})

const userProfile = model('userProfile', schema, 'userProfiles');
module.exports = userProfile;
