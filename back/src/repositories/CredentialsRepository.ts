import { Repository } from "typeorm";
import { AppDataSource } from "../config/data-source";
import { Credential } from "../entities/Credentials";



export const credentialRepository: Repository<Credential> = AppDataSource.getRepository(Credential)