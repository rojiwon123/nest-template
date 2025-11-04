import { IConfig } from "@lib/config";
import { IEventService } from "@lib/event";
import { MilliSec } from "@lib/util/time";
import { Global, Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { EventService } from "./event.service";
import { InternalEventToken } from "./event.token";

@Global()
@Module({
    imports: [
        ClientsModule.registerAsync([
            {
                name: InternalEventToken,
                inject: [IConfig.Token],
                async useFactory(config: IConfig) {
                    return {
                        transport: Transport.REDIS,
                        options: {
                            host: config.INTERNAL_EVENT_SYS_HOST,
                            port: Number(config.INTERNAL_EVENT_SYS_PORT),
                            retryAttempts: Infinity,
                            retryDelay: MilliSec.ONE_SEC * 5,
                        },
                    };
                },
            },
        ]),
    ],
    providers: [{ provide: IEventService.Token, useClass: EventService }],
    exports: [IEventService.Token],
})
export class EventModule {}
