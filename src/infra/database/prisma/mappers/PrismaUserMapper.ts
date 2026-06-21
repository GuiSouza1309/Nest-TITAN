import { User as UserDomain } from 'src/modules/user/entities/User';
import { User as UserRaw } from '@prisma/client';

export class PrismaUserMapper {
  static toPrisma(user: UserDomain): UserRaw {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      createdAt: user.createdAt,
    };
  }

  static toDomain(raw: UserRaw): UserDomain {
    return new UserDomain({
      name: raw.name,
      email: raw.email,
      password: raw.password,
      createdAt: raw.createdAt,
    }, raw.id); 
  }
}