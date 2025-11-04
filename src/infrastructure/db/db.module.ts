import { IConfig } from "@lib/config";
import { DB } from "@lib/db";
import { Global, Module } from "@nestjs/common";
import path from "path";
import { DataSource } from "typeorm";

@Global()
@Module({
    providers: [
        {
            provide: DB.MainToken,
            inject: [IConfig.Token],
            useFactory: ({}: IConfig) => {
                return new DataSource({
                    type: "mysql",
                    // host: DB_HOST,
                    // port: Number(DB_PORT),
                    // username: DB_USERNAME,
                    // password: DB_PASSWORD,
                    database: "main",
                    entities: [path.resolve(__dirname + "/../../entity/**/*.entity{.ts,.js}")],
                }).initialize();
            },
        },
    ],
    exports: [DB.MainToken],
})
export class DBModule {}
