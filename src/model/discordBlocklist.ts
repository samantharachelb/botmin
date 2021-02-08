import { Schema, model } from "mongoose";

const schema = new Schema({
    id: String,
    last_known_name: String,
    dateBanned: Date,
    reason: String
});

module.exports = model('discordBlocklist', schema, 'discordBlocklist');
