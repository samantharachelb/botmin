import { Schema, model } from 'mongoose';

const schema = new Schema({
    id: String,
    known_names: [String],
    date_created: Date
})

const discordProfile = model('discordProfile', schema,'discordProfiles');
module.exports = discordProfile;
