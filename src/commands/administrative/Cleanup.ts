import { Command, CommandMessage, Description, Infos } from "@typeit/discord";
import sendMessage from "@utils/sendMessage";
import newEmbed from "@utils/newEmbed";
import Permissions from "@src/core/Permissions";
import Config from "@src/core/Config";
const log = require("@src/core/Logging").Logging.logger;

export default abstract class Cleanup{
    @Command("cleanup :numMessage")
    @Infos({
        category: "Administrative",
        usage: `${Config.botPrefix}cleanup [num messages]`
    })
    @Description("Cleans up a specified number of messages")
    async cleanup(message: CommandMessage) {
        const embed = newEmbed(message);
        const replyTo = `<@${message.author.id}>`
        const numMessages = message.args.numMessages;

        if (!Permissions.checkAdmin(message)) {
            log.info(`User ${message.author.id} attempted to use a command that requires admin permissions`)
            return await Permissions.checkFailed(message);
        }

        if(!numMessages) {
            embed.setTitle("An error has occurred")
            embed.setDescription("You need to specify how many messages you want to delete!")
            embed.setColor(10027008)
            return await sendMessage(message, embed);
        } else {
            // @ts-ignore: it works fine
            message.channel.bulkDelete(numMessages + 1)
                .then(() => {
                    embed.setTitle("Cleaned up messages");
                    embed.setDescription(`${replyTo}\nCleaned up ${numMessages} messages`)
                    sendMessage(message, embed, true, false);
                }).catch((error: Error) => {
                log.error(error.toString());
                embed.setTitle("An error has occurred");
                embed.setDescription(`${replyTo} ${error.message}`);
                embed.setColor(10027008)
                sendMessage(message, embed);
            });
        }
    }
}
