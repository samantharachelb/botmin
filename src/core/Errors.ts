const log = require('@src/core/Logging').Logging.logger;

export class FileNotFoundError extends Error {
    constructor(message: any) {
        super();
        this.name = "File Not Found Error"
        this.message = message;
    }
}

export class DatabaseError extends Error {
    constructor(message: any) {
        super();
        this.name = "Database Error"
        this.message = message;
    }
}

export class DatabaseConfigError extends Error {
    constructor() {
        super();
        this.name = "Database Configuration Error";
        this.message = "Missing or Misconfigured Database Setting! Please check the docs and configuration.";
    }
}

export class AuthenticationError extends Error {
    constructor(message: any) {
        super();
        this.name = "Authentication Error";
        this.message = message;
    }
}

export class AuthenticationConfigError extends Error {
    constructor(message: any) {
        super();
        this.name = "Authentication Configuration Error";
        this.message = message;
    }
}

export class BotConfigError extends Error {
    constructor() {
        super();
        this.name = "Bot Configuration Error";
        this.message = "Missing one or more bot configuration options";
    }
}
