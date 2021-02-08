import { CommandMessage } from "@typeit/discord";
import Config from "@src/core/Config";
import newEmbed from "@utils/newEmbed";
import sendMessage from "@utils/sendMessage";

const jsonQuery = require("json-query");

export default abstract class Permissions {
    static checkAdmin(message: CommandMessage) {
        const roles = jsonQuery('id', {data: message.member?.roles?.cache.array()}).value;
        const validate = roles.filter((x: any) => Config.botAdminRoles.includes(x));
        return validate.length !== 0;
    }

    static async checkFailed(message: CommandMessage) {
        const embed = newEmbed(message);
        const replyTo = `<@${message.author.id}>`
        embed.setTitle("That's forbidden")
        embed.setDescription(`Hey ${replyTo}, You're not allowed to do that!`);
        embed.setImage("https://media.giphy.com/media/XakF9RJTHExlNXMFTn/giphy.gif");
        embed.setColor(10027008);

        await sendMessage(message, embed, false, false);
    }
}
