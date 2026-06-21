import { MiddlewareConsumer, Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { LocalStrategy } from "src/modules/auth/strategies/local.strategy";
import { UserModule } from "../user/user.module";
import { ValidateUserUseCase } from "src/modules/auth/useCases/validateUserUseCase";
import { DatabaseModule } from "src/infra/database/database.module";
import { SignInDTOValidateMiddleware } from "./middlewares/signInDTOValidate.middleware";
import { SignInUseCase } from "src/modules/auth/useCases/signInUseCase/signInUseCase";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "src/modules/auth/strategies/jwt.strategies";

@Module({
    imports: [DatabaseModule, UserModule, JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: process.env.JWT_EXPIRE as any },
      }),
    })],
    controllers: [AuthController],
    providers: [LocalStrategy, JwtStrategy, ValidateUserUseCase, SignInUseCase]
})

export class AuthModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(SignInDTOValidateMiddleware).forRoutes('/signIn');
    }
}