import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/modules/user/repositories/UserRepository';
import { compare } from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';

interface validateUserUseCaseRequest {
  email: string;
  password: string;
}

@Injectable()
export class ValidateUserUseCase {
    constructor(private userRepository: UserRepository) {}
    async execute({ email, password }: validateUserUseCaseRequest) {
        const user = await this.userRepository.findByEmail(email);

        if (!user) throw new UnauthorizedException("Email ou senha incorretos");

        const isPasswordMatched = await compare(password, user.password);

        if (!isPasswordMatched) throw new UnauthorizedException("Email ou senha incorretos");

        return user;
    }
}