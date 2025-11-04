import { PrismaClient } from "./generated/client";

export interface DB extends PrismaClient {}

export namespace DB {
    export const MainToken = Symbol("MainDBToken");
}
