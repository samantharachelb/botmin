import { Command, CommandMessage, Description, Infos } from "@typeit/discord";
import { MessageEmbed, TextChannel } from "discord.js"
import Config from "@src/core/Config";
import Bot from "@src/index";
import newEmbed from "@utils/newEmbed";
import sendMessage from "@utils/sendMessage";
import notify from "@src/utils/notify";
const log = require("@src/core/Logging").Logging.logger;

export abstract class Ban {
    @Command("ban :user :reason")
    @Infos({
        categories: "Administrative",
        usage: `${Config.botToken}ban [user mention] [reason]`
    })
    @Description("Bans a user")
    async command(message: CommandMessage, id?: string, reason?: string) {
        const embed = newEmbed(message);
        const replyTo = `<@${message.author.id}`;

    }

    /**
     * Automatically bans a user.
     * @param id: The Discord user ID of the member that should be banned
     * @param reason: Reasson for ban
     */
    async autoBan(id: string, reason: string): Promise<void> {
        const client = Bot._client;
        const embed = new MessageEmbed;
        const channel = client.channels.cache.find(ch => ch.id === Config.botAuditLogChannel) as TextChannel;


        /**
         * @todo: Implement ban function
         */

        embed.setTitle("Lorem Ipsum")
        embed.setDescription("peepee poopoo");
        await notify(channel, embed);
    }

}
