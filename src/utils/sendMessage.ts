import { CommandMessage} from "@typeit/discord";
import { MessageEmbed } from "discord.js";
import Config from "@src/core/Config";
const log = require("@src/core/Logging").Logging.logger;

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
