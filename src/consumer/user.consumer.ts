import { InternalEvent } from "@lib/event";
import { ILogger } from "@lib/logger";
import * as nest from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";

@nest.Controller()
export class UserConsumer {
    constructor(@nest.Inject(ILogger.Token) private readonly logger: ILogger) {}

    @EventPattern<InternalEvent.Name<"service-internal.user.created">>("service-internal.user.created")
    async gameEventCreated(@Payload() { userId }: InternalEvent.UserCreated["payload"]) {
        this.logger.log("user created", userId);
    }
}
