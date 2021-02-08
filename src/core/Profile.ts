import { Document } from "mongoose";
import { CommandMessage } from "@typeit/discord"
import Constants from "@src/core/Constants";
import newEmbed from "@utils/newEmbed";
const model = require("@src/model/discordProfile");
const log = require("@src/core/Logging").Logging.logger;


export default abstract class Profile {
    static async lookup(message: CommandMessage, id: string): Promise<void> {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        await model.find({}, {'_id:': 0, '__v': 0})
            .select(id)
            .exec((error: Error, result: Document) => {
                if (error) {
                    log.error(`Could not find profile for discord id: ${id}`);
                } else {
                    log.info("Found profile");
                }
            })
    }

    static async createDiscord(message: CommandMessage): Promise<void> {
        const profile = new model({
            id: message.author.id,
            knownNames: [ message.author.tag],
            dateCreated: message.author.createdAt
        })

        await profile.save();
    }
}
