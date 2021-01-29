import { Client } from "@typeit/discord";

export default abstract class Commands {
    static categories: Set<string>;
    static commandList: string[] = [];

    static indexCommands() {
        this.categories = new Set();
        const commands = Client.getCommands();
        for (let index = 0; index < commands.length; index++) {
            const data = {
                // @ts-ignore: '.split' exists on commandName
                name: commands[index].commandName.split(" ")[0],
                description: commands[index].description,
                usage: commands[index].infos.usage,
                category: commands[index].infos.category
            }

            // @ts-ignore: works just fine, ts-lint please stfu
            this.commandList.push(data);
            this.categories.add(commands[index].infos.category);
        }
    }
}
