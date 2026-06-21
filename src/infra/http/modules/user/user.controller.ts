import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserUseCase } from 'src/modules/user/useCases/createUserUseCase/createUserUseCase';
import { UserBody } from './dtos/createUserBody';
import { UserViewModel } from './viewModels/userViewModel';

@Controller('users')
export class UserController {

    constructor(private createUserUseCase: CreateUserUseCase) {

    }

    @Post()
    async createPost(@Body() body: UserBody) {
        const {email, name, password} = body;
        const user = await this.createUserUseCase.execute(body);
        return UserViewModel.toHTTP(user);
    }
}