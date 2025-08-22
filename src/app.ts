import { BillDts } from './infrastructure/database/postgreSQL/entities/bill.entities';
import { Server } from "./presentation/server";
import { envs } from "./config/envs";
import { AppRoutes } from "./presentation/routes";
import { MongoDatabase } from "./infrastructure/database/mongo/mongo-database";
import "reflect-metadata"
import { PostgresDatabase } from "./infrastructure/database/postgreSQL/postgres-database";
import { initDependencies } from './config/dependencies';
import { ProviderDts } from './infrastructure/database/postgreSQL/entities/provider.entities';


(async () => {
    main();
})();

async function main() {
    // db concect
    await MongoDatabase.connect({
        dbName: envs.MONGO_DB_NAME,
        mongoUrl: envs.MONGO_URL
    })

    await PostgresDatabase.connect({
        postgresUrl: "postgres://postgres:123456@localhost:5432/Purchasing-department",
        dbName: envs.POSTGRES_DB_NAME,
        entities: [ProviderDts, BillDts]
    })

    const dependencies = initDependencies();

    // Start server
    const server = new Server({
        port: envs.PORT,
        routes: AppRoutes.routes(dependencies)
    });

    server.start();
}