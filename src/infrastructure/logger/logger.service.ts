import winston from "winston";

import { IConfig } from "@lib/config";
import { ILogger, LogLevel } from "@lib/logger";
import { Inject, Injectable } from "@nestjs/common";
import { LOCAL_TRANSPORT } from "./transport/local.transport";

@Injectable()
export class Logger implements ILogger {
    private readonly logger: winston.Logger;
    constructor(@Inject(IConfig.Token) config: IConfig) {
        this.logger = winston.createLogger({
            levels: { FATAL: 0, ERROR: 1, WARN: 2, INFO: 3 } satisfies Record<LogLevel, number>,
            level: config.LOG_LEVEL,
            transports: [LOCAL_TRANSPORT],
        });
    }

    private _log(level: Lowercase<LogLevel>, message: unknown[]) {
        this.logger.log(level.toUpperCase(), { message });
    }

    log(...message: unknown[]) {
        this.info(...message);
    }

    info(...msg: unknown[]) {
        this._log("info", msg);
    }

    warn(...msg: unknown[]) {
        this._log("warn", msg);
    }

    error(...msg: unknown[]) {
        this._log("error", msg);
    }

    fatal(...msg: unknown[]) {
        this._log("fatal", msg);
    }

    trace(...msg: unknown[]) {
        this.info(...msg);
    }

    verbose(...msg: unknown[]) {
        this.info(...msg);
    }

    debug(...msg: unknown[]) {
        this.info(...msg);
    }
}
