import { Client } from "@typeit/discord";
import mongoose from "mongoose";
import Config from "@src/core/Config";
import {AuthenticationConfigError} from "@src/core/Errors";
import forceExit from "@utils/forceExit";
const log = require("@src/core/Logging").Logging.logger;

export default abstract class Main {
    static _client: Client;

    static get Client(): Client {
        return this._client;
    }

    static preflight() {
        log.info("Running Preflight Checks...");
        Config.loadCore();
    }

    static async connectDB() {
        log.info("Connecting to database...");
        const connectionUri = `mongodb://${Config.dbHost}/${Config.dbDatabase}`
        const connectionOptions = {
            user: Config.dbUsername,
            pass: Config.dbPassword,
            useUnifiedTopology: true,
            useNewUrlParser: true,
            keepAlive: true,
            keepAliveInitialDelay: 1000,
            promiseLibrary: global.Promise,
            authSource: "admin"
        }
        await mongoose.connect(connectionUri, connectionOptions)
            .then(() => {
                log.info("Successfully connected to database");
            }).catch((err: Error) => {
                log.error("Error connecting to the database");
                log.error(err);
        })
    }
    static login() {
        log.info(`Starting botmin `);
        this._client = new Client({
            classes: [
                `${__dirname}/**/app.ts`,
                `${__dirname}/**/app.js`
            ],
            silent: false,
            variablesChar: ":"
        });

        this._client.login(Config.botToken)
            .then(r => Promise)
            .catch((e: Error) => {
               const error = new AuthenticationConfigError(Error);
               forceExit(`${error}`);
            });
    }

    static async run() {
        this.preflight();
        await this.connectDB();
        this.login()
    }
}

Main.run()
