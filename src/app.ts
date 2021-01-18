import { Client, Discord, On, ArgsOf } from "@typeit/discord";
import "reflect-metadata";
import path from "path";
import Config from "@src/core/Config";

const log = require("@src/core/Log");

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
    }

    @On("guildMemberRemove")
    async onGuildMemberRemove([member]: ArgsOf<"guildMemberRemove">): Promise<void> {

    }

    @On("guildMemberAdd")
    async onGuildMemberAdd([member]: ArgsOf<"guildMemberAdd">): Promise<void> {

    }

    @On("message")
    async onMessage([message]: ArgsOf<"message">, client: Client): Promise<void> {

    }
}
