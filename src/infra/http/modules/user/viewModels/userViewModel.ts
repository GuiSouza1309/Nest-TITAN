import { User } from '../../../../../modules/user/entities/User';

export class UserViewModel {
    static toHTTP({createdAt, email, name, id}: User) {
        return {
            id,
            name,
            email,
            createdAt,
        };
    }
}