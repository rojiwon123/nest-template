import { IConfig } from "@lib/config";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_FILTER, APP_GUARD } from "@nestjs/core";
import { DBModule } from "./db/db.module";
import { EventModule } from "./event/event.module";
import { AllExceptionFilter } from "./filter/all.exception-filter";
import { AuthGuard } from "./guard/auth.guard";
import { LoggerModule } from "./logger/logger.module";

@Module({
    imports: [ConfigModule.forRoot({ isGlobal: true, ignoreEnvFile: true, load: [IConfig.Factory] }), LoggerModule, EventModule, DBModule],
    providers: [
        { provide: APP_GUARD, useClass: AuthGuard },
        { provide: APP_FILTER, useClass: AllExceptionFilter },
    ],
})
export class InfraModule {}
