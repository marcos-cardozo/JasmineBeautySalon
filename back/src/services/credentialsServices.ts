import { Credential } from "../entities/Credentials";
import bcrypt from "bcrypt";
import { credentialRepository } from "../repositories/CredentialsRepository";
import { EntityManager } from "typeorm";

export const validateCredentialService = async (username: string, password: string): Promise<number | undefined> => {
  const usernameFound: Credential | null = await credentialRepository.findOneBy({ username });

  if (!usernameFound) {
      throw new Error(`El usuario ${username} no fue encontrado`);
  }

  const isPasswordValid = await bcrypt.compare(password, usernameFound.password);

  if (!isPasswordValid) {
      throw new Error("Usuario o contraseña incorrectos");
  }

  return usernameFound.id;
};

const passwordEncryption: (password: string) => Promise<string> = 
async (password: string): Promise<string> => {
  const passwordEncrypted: string = await bcrypt.hash(password, 10);
  return passwordEncrypted;
};

export const createCredentialsServices: (entityManager: EntityManager, username: string, password: string) => Promise<Credential> = 
async (entityManager: EntityManager, username: string, password: string): Promise<Credential> => {
  const encryptedPassword: string = await passwordEncryption(password);

  const Credentials: Credential = entityManager.create(Credential, {
    username,
    password: encryptedPassword
  })


  return await entityManager.save(Credentials) 
};
