import { DataSource } from "typeorm";

interface Options {
    postgresUrl: string;
    dbName: string;
    entities: any[];
}

export class PostgresDatabase {
    static datasource: DataSource;

    static async connect(options: Options) {
        const { postgresUrl, dbName, entities } = options;
        try {
            this.datasource = new DataSource({
                type: 'postgres',
                url: postgresUrl,
                database: dbName,
                synchronize: true,
                logging: false,
                entities
            });

            await this.datasource.initialize();
            console.log('Postgres connected');
        } catch (error) {
            console.error('Postgres connection error', error);
        }
    }
}