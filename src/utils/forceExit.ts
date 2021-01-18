const log = require("@src/core/Logging").Logging.logger;

export default function forceExit(reason: string, exitCode = 1): void {
    log.error("An unrecoverable error has occured...");
    if (reason) {
        log.error(reason);
    }
    process.exit(exitCode);
}
