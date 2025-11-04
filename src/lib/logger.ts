import { LoggerService } from "@nestjs/common";

export type LogLevel = "INFO" | "WARN" | "ERROR" | "FATAL";

export interface ILogger extends LoggerService {
    readonly log: (...message: unknown[]) => void;
    readonly info: (...message: unknown[]) => void;
    readonly warn: (...message: unknown[]) => void;
    readonly error: (...message: unknown[]) => void;
    readonly fatal: (...message: unknown[]) => void;
    readonly trace: (...message: unknown[]) => void;
    readonly verbose: (...message: unknown[]) => void;
    readonly debug: (...message: unknown[]) => void;
}

export namespace ILogger {
    export const Token = Symbol("Logger");
}
