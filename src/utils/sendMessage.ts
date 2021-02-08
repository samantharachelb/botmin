import { CommandMessage} from "@typeit/discord";
import { MessageEmbed } from "discord.js";
import Config from "@src/core/Config";
const log = require("@src/core/Logging").Logging.logger;

/**
 * Sends a message to the same channel that a command was received from
 * @param message: Incoming command of type `CommandMessage`
 * @param content: Content to respond with. Must be of type `string` or `MessageEmbed`
 * @param delMsg: Should sent messages be deleted. Must be of type `boolean`
 * @param delCmd: Should incoming commands be deleted? Must be of type `boolean`
 */
export default async function sendMessage(
    message: CommandMessage,
    content: string | MessageEmbed,
    delMsg: boolean = Config.botDeleteMessage,
    delCmd: boolean = Config.botDeleteCommand): Promise<void> {

    message.channel.send(content)
        .then((msg: any) => {
            if(delMsg)
                msg.delete({timeout: Config.botMessageTimeout});

            if(delCmd)
                message.delete({timeout: Config.botMessageTimeout});

        })
        .catch(e => {
            log.error("Could not send message");
            log.error(e.toString());
        })
}
