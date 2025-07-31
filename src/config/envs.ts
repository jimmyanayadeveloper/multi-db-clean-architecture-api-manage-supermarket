import 'dotenv/config'
import { get } from "env-var";

export const envs = {
    PORT: get('PORT').required().asPortNumber(),
    /* Mongo */
    MONGO_URL: get('MONGO_URL').required().asString(),
    MONGO_DB_NAME: get('MONGO_DB_NAME').required().asString(),
    JWT_SEED: get('JWT_SEED').required().asString(),
    /* Postgres */
    POSTGRES_URL: get('POSTGRES_URL').required().asString(),
    POSTGRES_DB_NAME: get('POSTGRES_DB').required().asString()
}

//npm i dotenv env-var

