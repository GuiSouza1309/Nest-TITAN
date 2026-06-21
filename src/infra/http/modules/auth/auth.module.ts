import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { LocalStrategy } from "src/modules/auth/strategies/local.strategy";
import { UserModule } from "../user/user.module";
import { ValidateUserUseCase } from "src/modules/auth/useCases/validateUserUseCase";
import { DatabaseModule } from "src/infra/database/database.module";

@Module({
    imports: [DatabaseModule, UserModule],
    controllers: [AuthController],
    providers: [LocalStrategy, ValidateUserUseCase]
})
export class AuthModule {}