import { Schema, model } from 'mongoose';

const schema = new Schema({
    name: String,
    link: [String],
    associatedDiscord: String,
    status: {
        state: String,
        reason: String
    }
})

const facebookProfile = model('facebookProfile', schema,'facebookProfiles');
module.exports = facebookProfile;
