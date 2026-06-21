import { CreateUserUseCase } from "./createUserUseCase";
import { UserRepositoryInMemory } from "../../repositories/UserRepositoryInMemory";
import { compare } from "bcrypt";

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
      password: '123456'
    });

    expect(userRepositoryInMemory.users).toEqual([user]);
  });

  it('Should be able to create a new user with password encrypted', async () => {
    const userPasswordWithoutEncryption = 'hawktuah';

    const user = await createUserUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: userPasswordWithoutEncryption
    });

    const isPasswordEncrypted = await compare(userPasswordWithoutEncryption, user.password);
    expect(isPasswordEncrypted).toBe(true);
  });
});