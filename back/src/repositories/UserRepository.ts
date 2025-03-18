import { Repository } from "typeorm";
import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";

export const userRepository: Repository<User> = AppDataSource.getRepository(User)