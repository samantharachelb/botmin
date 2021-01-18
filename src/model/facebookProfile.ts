import { Schema, model } from 'mongoose';

let schema = new Schema({
    name: String,
    link: [String],
    associated_discord: String,
    status: {
        state: String,
        reason: String
    }
})

const facebookProfile = model('facebookProfile', schema,'facebookProfiles');
module.exports = facebookProfile;
