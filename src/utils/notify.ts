import { MessageEmbed, TextChannel, DMChannel } from "discord.js";
const log = require("@src/core/Logging").Logging.logger;

/**
 * Sends a notification to any channel
 * @param channel: Channel object. Must be type `TextChannel` or `DMChannel`
 * @param content: message content. Must be either `string` or `MessageEmbed`
 */
export default async function notify(
    channel: TextChannel | DMChannel,
    content: string | MessageEmbed): Promise<void> {

    await channel.send(content)
        .catch((error: Error) => {
            log.error("Could not send message");
            log.error(`${error}`);
        });
}
