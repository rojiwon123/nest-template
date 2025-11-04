import { registerAs } from "@nestjs/config";
import typia from "typia";
import { LogLevel } from "./logger";

export interface IConfig {
    NODE_ENV: "development" | "production";
    MODE: "main" | "worker";

    LOG_LEVEL: LogLevel;

    PORT: number | `${number}`;

    INTERNAL_EVENT_SYS_HOST: string;
    INTERNAL_EVENT_SYS_PORT: number | `${number}`;
}
export namespace IConfig {
    export const Factory = registerAs("Config", () =>
        typia.assert<IConfig>({
            LOG_LEVEL: "INFO",
            PORT: 4000,
            INTERNAL_EVENT_SYS_HOST: "localhost",
            INTERNAL_EVENT_SYS_PORT: 6379,
            ...process.env,
        } satisfies Partial<IConfig>),
    );
    export const Token = Factory.KEY;
}
