import { DataSource } from "typeorm";
import { DB_DROP, DB_ENTITIES, DB_HOST, DB_LOGG, DB_NAME, DB_PASSWORD, DB_PORT, DB_SYNC, DB_TYPE, DB_USERNAME } from "./envs";

export const AppDataSource = new DataSource({
    type: DB_TYPE,
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    synchronize: DB_SYNC,
    logging: DB_LOGG,
    entities: DB_ENTITIES,
    dropSchema: DB_DROP
})


