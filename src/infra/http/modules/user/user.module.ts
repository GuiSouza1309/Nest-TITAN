import { Module } from "@nestjs/common";
import { CreateUserUseCase } from "src/modules/user/useCases/createUserUseCase/createUserUseCase";
import { UserController } from "./user.controller";
import { DatabaseModule } from "src/infra/database/database.module";

@Module({
  imports: [DatabaseModule], 
  controllers: [UserController], 
  providers: [CreateUserUseCase],
  exports: [DatabaseModule],
})
export class UserModule {

}