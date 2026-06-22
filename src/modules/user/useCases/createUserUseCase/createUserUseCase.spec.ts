import { CreateUserUseCase } from './createUserUseCase';
import { UserRepositoryInMemory } from '../../repositories/UserRepositoryInMemory';
import { compare } from 'bcrypt';
import { makeUser } from '../../factories/userFactory';
import { UserWithSameEmailException } from '../../exceptions/UserWithSameEmailException';

let createUserUseCase: CreateUserUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;

describe('Create User', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
  });

  it('Should be able to create a new user', async () => {
    expect(userRepositoryInMemory.users).toEqual([]);

    const user = await createUserUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
    });

    expect(userRepositoryInMemory.users).toEqual([user]);
  });

  it('Should be able to create a new user with password encrypted', async () => {
    const userPasswordWithoutEncryption = 'hex';

    const user = await createUserUseCase.execute({
      name: 'Nicole',
      email: 'nicolereeyn@email.com',
      password: userPasswordWithoutEncryption,
    });

    const isPasswordEncrypted = await compare(
      userPasswordWithoutEncryption,
      user.password,
    );
    expect(isPasswordEncrypted).toBe(true);
  });

  it('Should be able to throw error when user with already existing email is created', () => {
    const user = makeUser({});

    userRepositoryInMemory.users = [user];

    expect(
      async () =>
        await createUserUseCase.execute({
          email: user.email,
          name: 'gui',
          password: '123123',
        }),
    ).rejects.toThrow(UserWithSameEmailException);
  });
});