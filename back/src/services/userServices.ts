import { AppDataSource } from "../config/data-source";
import { UserDto, UserLoginDto, UserLoginSucessDto, UserRegisterDto } from "../dtos/UserDto";
import { Credential } from "../entities/Credentials";
import { User } from "../entities/User";
import { userRepository } from "../repositories/UserRepository";
import { createCredentialsServices, validateCredentialService } from "./credentialsServices";


export const getUsersServices: () => Promise<UserDto[]> = async(): Promise<UserDto[]> => {
  const users: User[] = await userRepository.find({
    relations: ["appointments"]
  })
  return users
};

export const getUserByIdServices: (id: number) => Promise<UserDto> = async(id: number): Promise<UserDto> => {
  const userWanted: User | null = await userRepository.findOne({where: { id },   relations: ["appointments"]});

  if (userWanted) {
    return userWanted;
  } else {
    throw new Error(`El usuario numero ${id} no fue encontrado, intente nuevamente`);
  }
};

export const registerUserServices: (userData: UserRegisterDto) => Promise<UserDto> =
 async (userData: UserRegisterDto): Promise<UserDto> => {

  const result = AppDataSource.transaction(async(entityManager) => {
    
    const credentialsUser: Credential = await createCredentialsServices(entityManager, userData.username, userData.password);
    
    const newUserCreated = entityManager.create(User, {
      name: userData.name,
      email: userData.email,
      birthdate: userData.birthdate,
      nDni: userData.nDni,
      credentials: credentialsUser,
    })

    return await entityManager.save(newUserCreated) 
  }) 

  return result
};

export const loginUserService: (user: UserLoginDto) => Promise<UserLoginSucessDto> = async (user: UserLoginDto): Promise<UserLoginSucessDto> => {
  const credentialId: number | undefined = await validateCredentialService(user.username, user.password);

  const userFound: User | null = await userRepository.findOne({
    where: {
      credentials: {
        id: credentialId
      }
    }
  })
  return {
    login: true,
    user: {
      id: userFound?.id ?? 0,
      name: userFound?.name ?? "",
      email: userFound?.email ?? "",
      birthdate: userFound?.birthdate ?? new Date(),
      nDni: userFound?.nDni ?? 0
    }
  }
}