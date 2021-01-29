import { Command, CommandMessage, Description, Infos } from '@typeit/discord';
import { MessageEmbed } from "discord.js";
import sendMessage from "@utils/sendMessage"
import newEmbed from "@utils/newEmbed";
import HCommands from "@src/helpers/HCommands";
import Config from "@src/core/Config";

const log = require("@src/core/Logging").Logging.logger;
const jsonQuery = require('json-query');

export abstract class Help {
    private static embed: MessageEmbed;
    private static replyTo: string;

    @Command("help :arg")
    @Infos({
        category: "general",
        usage: "help [category|commandname](optional)"
    })
    @Description("displays command help information")
    async help(message: CommandMessage) {
        const arg = message.args.arg;

        Help.replyTo = `<@${message.author.id}>`;
        Help.embed = new MessageEmbed;
        Help.embed.setTitle("Help");

        if (!arg) {
            await Help.displayAllCategories(message);
        } else if (HCommands.categories.has(arg)){
            await Help.displayCommandCategory(message, arg);
        } else {
            await Help.displaySpecificCommand(message, arg)
        }
    }

    private static async displayAllCategories(message: any): Promise<void> {
        HCommands.categories.forEach((item: any) => {
            Help.embed.addField(`**${item}**`, `\`${Config.botPrefix}help ${item}\``);
        })
        await sendMessage(message, Help.embed, false);
    }

    private static async displayCommandCategory(message: any, category: string): Promise<void> {
        const commandList = jsonQuery(`[*category=${category}]`, {
            data: HCommands.commandList
        }).value;

        for (let index = 0; index < commandList.length; index++) {
            Help.embed.addField(`\`${Config.botPrefix}${commandList[index].name}\``, commandList[index].description);
        }
        await sendMessage(message, Help.embed, false);
    }

    public static async displaySpecificCommand(message: any, commandName: string): Promise<void> {
        const command = jsonQuery(`[name=${commandName}]`, {
            data: HCommands.commandList
        }).value;
        Help.embed.setTitle(command.name);
        Help.embed.addField(command.description, `Usage: \`${command.usage}\``)
        await sendMessage(message, Help.embed);
    }
}
