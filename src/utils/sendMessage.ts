import { CommandMessage} from "@typeit/discord";
import Config from "@src/core/Config";
const log = require("@src/core/Log").Log.logger;

export default async function sendMessage(
    message: CommandMessage,
    content: string,
    delMsg: boolean = Config.deleteMessage,
    delCmd: boolean = Config.deleteCommand): Promise<void> {

    message.channel.send(content)
        .then((msg: any) => {
            if(delMsg)
                msg.delete({timeout: Config.messageTimeout});

            if(delCmd)
                message.delete({timeout: Config.messageTimeout});

        })
        .catch(e => {
            log.error("Could not send message");
            log.error(e.toString());
        })
}
