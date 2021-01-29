import { Client } from "@typeit/discord";
import Config from "@src/core/Config";
import {AuthenticationConfigError} from "@src/core/Errors";
import forceExit from "@utils/forceExit";

const log = require("@src/core/Logging").Logging.logger;



abstract class Main {
    private static _client: Client;

    static get Client(): Client {
        return this._client;
    }

    static preflight() {
        log.info("Running Preflight Checks...");
        Config.loadCore();
    }

    static start() {
        log.info(`Starting botmin `);
        this._client = new Client({
            classes: [
                `${__dirname}/**/app.ts`,
                `${__dirname}/**/app.js`
            ],
            silent: false,
            variablesChar: ":"
        });

        this._client.login(Config.discordKey)
            .then(r => Promise)
            .catch((e: Error) => {
               const error = new AuthenticationConfigError(Error);
               forceExit(`${error}`);
            });
    }
}

Main.preflight();
Main.start();
