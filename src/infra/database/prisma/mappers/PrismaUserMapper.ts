import { User } from '../../../../modules/user/entities/User';
import { User as UserRaw } from '@prisma/client';

export class PrismaUserMapper {
    static toPrisma({createdAt, email, name, password, id}: User): UserRaw {
        return {
            id,
            name,
            email,
            password,
            createdAt,
        };
    }
}