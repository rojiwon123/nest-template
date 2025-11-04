import { DB } from "@lib/db";
import { Global, Module } from "@nestjs/common";
import { PrismaServices } from "./prisma.service";

@Global()
@Module({
    providers: [{ provide: DB.MainToken, useClass: PrismaServices }],
    exports: [DB.MainToken],
})
export class DBModule {}
