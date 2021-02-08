import { Command, CommandMessage, Description, Infos } from "@typeit/discord";
import { MessageEmbed } from "discord.js";
import sendMessage from "@utils/sendMessage";
import newEmbed from "@utils/newEmbed";
import Profile from "@src/core/Profile";

const log = require("@src/core/Logging").Logging.logger;

export abstract class TestProfile {
    private static embed: MessageEmbed;
    private static replyTo: string;

    @Command("testprofile")
    @Infos({
        category: "DeveloperTools",
        usage: "testprofile"
    })
    @Description("Tests profile related functions")
    async testProfile(message: CommandMessage): Promise<void> {
        //Profile.lookup(message, message.author.id);
        await Profile.createDiscord(message);
    }
}
