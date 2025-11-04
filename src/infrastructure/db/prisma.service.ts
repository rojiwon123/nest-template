import { IConfig } from "@lib/config";
import { DB } from "@lib/db";
import { PrismaClient } from "@lib/db/generated/client";
import { Inject, Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { PrismaPg } from "@prisma/adapter-pg";

@Injectable()
export class PrismaServices extends PrismaClient implements DB, OnModuleInit, OnModuleDestroy {
    constructor(@Inject(IConfig.Token) config: IConfig) {
        super({ adapter: new PrismaPg({ connectionString: config.DATABASE_URL }) });
    }
    onModuleInit() {
        return this.$connect();
    }

    onModuleDestroy() {
        return this.$disconnect();
    }
}
