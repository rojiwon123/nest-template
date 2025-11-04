import { ILogger } from "@lib/logger";
import { Global, Module } from "@nestjs/common";
import { Logger } from "./logger.service";

@Global()
@Module({ providers: [{ provide: ILogger.Token, useClass: Logger }], exports: [ILogger.Token] })
export class LoggerModule {}
