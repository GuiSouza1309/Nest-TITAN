
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ValidateUserUseCase } from '../useCases/validateUserUseCase';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private validateUsercase: ValidateUserUseCase) {
    super({
        usernameField: 'email',
    });
  }

  async validate(email: string, password: string) {
    return await this.validateUsercase.execute({
      email,
      password
    });
  }
}
