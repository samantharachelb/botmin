import { Client } from "@typeit/discord";
const log = require("@src/core/Logging").Logging.logger;

export default abstract class HCommands {
    static categories: Set<string>;
    static commandList: [] = [];
    static indexCommands() {
        this.categories = new Set();
        const commands = Client.getCommands();
        for (let index = 0; index < commands.length; index++) {
            const data = {
                // @ts-ignore: this works, actually
                name: commands[index].commandName.split(" ")[0],
                description: commands[index].description,
                usage: commands[index].infos.usage,
                category: commands[index].infos.category
            }
            // @ts-ignore: yeah this works too bud
            this.commandList.push(data);
            this.categories.add(commands[index].infos.category);
        }
    }
}
