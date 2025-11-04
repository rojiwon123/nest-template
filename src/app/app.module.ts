import { InfraModule } from "@/infrastructure/infra.module";
import { Module, Provider } from "@nestjs/common";

const modules: Provider[] = [];

@Module({
    imports: [InfraModule],
    providers: modules,
    exports: modules,
})
export class AppModule {}
