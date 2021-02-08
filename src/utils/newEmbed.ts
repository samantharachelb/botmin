import { MessageEmbed, Message } from "discord.js";
import { CommandMessage } from "@typeit/discord";

export default function newEmbed(message: CommandMessage | Message): MessageEmbed {
    const embed = new MessageEmbed();
    embed.setAuthor(message.client.user?.username, message.client.user?.displayAvatarURL())
    embed.setColor(7506395);
    return embed;
}
