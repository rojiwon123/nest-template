export interface IEventService {
    emitInternalEvent<E extends InternalEvent.EventGroup>(name: E["name"], payload: E["payload"]): Promise<void>;
    // emitExternalEvent(): Promise<void>;
}

export namespace IEventService {
    export const Token = Symbol("EventToken");
}

export namespace InternalEvent {
    export type EventGroup = UserCreated | UserUpdated;
    export type Name<T extends EventGroup["name"]> = T;

    export interface UserCreated {
        name: "service-internal.user.created";
        payload: { userId: string };
    }

    export interface UserUpdated {
        name: "service-internal.user.updated";
        payload: { userId: string };
    }
}
