import { Schema, model } from 'mongoose';

const schema = new Schema({
    id: String,
    knownNames: [String],
    dateCreated: Date
})

const discordProfile = model('discordProfile', schema,'discordProfiles');
module.exports = discordProfile;
