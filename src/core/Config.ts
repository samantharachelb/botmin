import { AuthenticationConfigError, BotConfigError, DatabaseConfigError } from "@src/core/Errors";
import forceExit from "@utils/forceExit";

const dotenv = require('dotenv');
dotenv.config({path: "./env"})
const env = process.env;
const log = require('@src/core/Logging').Logging.logger;


export default abstract class Config {
    static dbHost: string;
    static dbUsername: string;
    static dbPassword: string;
    static dbDatabase: string;

    static botToken: string;
    static botPrefix: string;

    // -- Roles and Channels --
    static botId: string;
    static botOwner: string;
    static botAdminRoles: string[] = [];
    static botAdminChannel: string;
    static botAuditLogChannel: string;

    static botMessageTimeout: number;
    static botDeleteCommand: true;
    static botDeleteMessage: true;

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

        if (env.BOT_TOKEN) {
            this.botToken = env.BOT_TOKEN;
        } else {
            error = new AuthenticationConfigError("Missing Discord Bot Key");
            forceExit(`${error}`)
        }

        this.botPrefix = env.BOT_PREFIX || "!b;";

        this.botOwner = "163424842714972160";
        if (env.BOT_ADMIN_ROLES) {
            if (env.BOT_ADMIN_ROLES.match(/\d*\s\d*/g)) {
                const roles = env.BOT_ADMIN_ROLES.split(" ")
                for (let index = 0; index < roles.length; index++) {
                    this.botAdminRoles.push(roles[index]);
                }
            } else {
                this.botAdminRoles[0] = env.BOT_ADMIN_ROLES
            }
        } else {
            error = new BotConfigError;
            forceExit(`${error}`);
        }

        if (env.BOT_ADMIN_CHANNEL) {
            this.botAdminChannel = env.BOT_ADMIN_CHANNEL;
        } else {
            error = new BotConfigError;
            forceExit(`${error}`);
        }

        if (env.BOT_AUDITLOG_CHANNEL) {
            this.botAuditLogChannel = env.BOT_AUDITLOG_CHANNEL;
        } else {
            error = new BotConfigError;
            forceExit(`${error}`);
        }

        if(env.BOT_DELETE_TIMEOUT) {
            this.botMessageTimeout = parseInt(env.BOT_DELETE_TIMEOUT) * 1000; // convert to ms
        } else {
            this.botMessageTimeout = 15 * 1000; // 15,000ms / 15s
        }
        this.botDeleteCommand = this.boolConv(env.BOT_DELETE_MESSAGE) || true;
        this.botDeleteMessage = this.boolConv(env.BOT_DELETE_INVOKING) || true;
    }

}
