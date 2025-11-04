import { IEventService, InternalEvent } from "@lib/event";
import { Inject, Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";
import { InternalEventToken } from "./event.token";

@Injectable()
export class EventService implements IEventService, OnModuleInit, OnModuleDestroy {
    constructor(@Inject(InternalEventToken) private readonly internalEventClient: ClientProxy) {}

    async onModuleInit() {
        await this.internalEventClient.connect();
    }
    async onModuleDestroy() {
        await this.internalEventClient.close();
    }

    async emitInternalEvent<E extends InternalEvent.EventGroup>(name: E["name"], payload: E["payload"]): Promise<void> {
        await lastValueFrom(this.internalEventClient.emit(name, payload));
    }
}
