import { AppModule } from "@app/app.module";
import { IConfig } from "@lib/config";
import { ILogger } from "@lib/logger";
import { MilliSec } from "@lib/util/time";
import { OmitKeyof } from "@lib/util/type";
import { DynamicModule } from "@nestia/core";
import { INestApplication, NestApplicationOptions } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import path from "path";
import typia from "typia";

const dirname = __dirname;

const PORT = typia.is<number | `${number}`>(process.env["PORT"]) ? Number(process.env["PORT"]) : 4002;
const mode = process.env["MODE"];
typia.assertGuard<"main" | "worker">(mode);

export const bootstrap = async ({
    name,
    module,
    options = {},
    use = async () => {},
}: {
    name: string;
    module: unknown;
    options?: OmitKeyof<NestApplicationOptions, "logger" | "bufferLogs" | "autoFlushLogs">;
    use?: (app: INestApplication) => Promise<void>;
}) => {
    const app = await NestFactory.create(module, { ...options, bufferLogs: true });
    const logger: ILogger = app.get(ILogger.Token);
    app.useLogger(logger);
    await use(app);
    process.on("SIGINT", async () => {
        await app.close();
        logger.log(`(${name}) Nest Application End`);
        process.exit(process.exitCode);
    });
    await app.init();
    await app.listen(PORT);
    logger.log(`(${name}) Nest Application Start`);
};

void (async () =>
    bootstrap(
        mode === "main" ?
            {
                name: "Main",
                module: await DynamicModule.mount(path.resolve(dirname + "/controller"), { imports: [AppModule] }),
                options: { cors: { origin: "*", credentials: false } },
                async use(app) {
                    app.use(cookieParser(), helmet({ contentSecurityPolicy: true, hidePoweredBy: true }));
                },
            }
        :   {
                name: "Worker",
                module: await DynamicModule.mount(path.resolve(dirname + "/consumer"), { imports: [AppModule] }),
                async use(app) {
                    const config: IConfig = app.get(IConfig.Token);
                    app.connectMicroservice<MicroserviceOptions>({
                        transport: Transport.REDIS,
                        options: {
                            host: config.INTERNAL_EVENT_SYS_HOST,
                            port: Number(config.INTERNAL_EVENT_SYS_PORT),
                            retryAttempts: Infinity,
                            retryDelay: MilliSec.ONE_SEC * 5,
                        },
                    });
                    await app.startAllMicroservices();
                },
            },
    ))();
