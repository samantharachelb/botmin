import { DatabaseConfigError, AuthenticationConfigError } from "@src/core/Errors";
import forceExit from "@utils/forceExit";

const dotenv = require('dotenv');
dotenv.config({path: "./env"})
const env = process.env;


export default abstract class Config {
    static dbHost: string;
    static dbUsername: string;
    static dbPassword: string;
    static dbDatabase: string;


    static discordKey: string;
    static botPrefix: string;
    static messageTimeout: number;
    static deleteCommand: true;
    static deleteMessage: true;

    static boolConv(val: string | undefined): boolean | void {
        switch(val) {
            case "yes":
                return true;
            case "no":
                return false;
            default:
                break
        }
    }


    static loadCore(): void {
        let error: Error;

        if (env.DB_HOST && env.DB_USERNAME && env.DB_PASSWORD && env.DB_DATABASE) {
                this.dbHost = env.DB_HOST;
                this.dbUsername = env.DB_USERNAME;
                this.dbPassword = env.DB_PASSWORD;
                this.dbDatabase = env.DB_DATABASE;
        } else {
            error = new DatabaseConfigError;
            forceExit(`${error}`);
        }

        if (env.DISCORD_KEY) {
            this.discordKey = env.DISCORD_KEY;
        } else {
            error = new AuthenticationConfigError("Missing Discord Bot Key");
            forceExit(`${error}`)
        }

        this.botPrefix = env.BOT_PREFIX || "!bm";
        if(env.MSG_TIMEOUT) {
            this.messageTimeout = parseInt(env.MSG_TIMEOUT) * 1000; // convert to ms
        } else {
            this.messageTimeout = 15 * 1000; // 15,000ms / 15s
        }
        this.deleteCommand = this.boolConv(env.BOT_DELETEMSG) || true;
        this.deleteMessage = this.boolConv(env.BOT_DELETECMD) || true;

    }
}
