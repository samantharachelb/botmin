import { Schema, model } from 'mongoose';

const schema = new Schema({
    discordInfo: {
        id: String,
        knownNames: [String],
        dateCreated: Date
    },
    facebookInfo: {
        name: String,
        link: String
    },
    status: {
        state: String,
        reason: String
    }
})

const userProfile = model('userProfile', schema, 'userProfiles');
module.exports = userProfile;
