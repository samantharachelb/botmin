import { Client, Discord, On, ArgsOf } from "@typeit/discord";
import "reflect-metadata";
import path from "path";
import Config from "@src/core/Config";
import HCommands from "@src/helpers/HCommands"

const log = require("@src/core/Logging").Logging.logger;

@Discord(Config.botPrefix, {
    import: [
        path.join(__dirname, 'commands/**', '*.ts'),
        path.join(__dirname, 'commands/**', '*.js')
    ]
})
abstract class Bot {
    @On('ready')
    async onReady(args: string[], bot: Record<string, any>, client: Client): Promise<void> {
        log.info(`Logged in as ${bot.user.tag}`);
        bot.user.setActivity(`${Config.botPrefix}help`, {
            type: "LISTENING"
        });
        HCommands.indexCommands();
    }

    @On("guildMemberRemove")
    async onGuildMemberRemove([member]: ArgsOf<"guildMemberRemove">, client: Client): Promise<void> {
        log.info(`User: ${member.displayName} was removed from server.`)
    }

    @On("guildMemberAdd")
    async onGuildMemberAdd([member]: ArgsOf<"guildMemberAdd">): Promise<void> {
        log.info(`User: ${member.displayName} joined the server.`)
    }

    @On("message")
    async onMessage([message]: ArgsOf<"message">, client: Client): Promise<void> {
        // @ts-ignore: property exists
        log.info(`${message.author.username} to ${message.channel.name}: ${message.content}`);
    }
}
