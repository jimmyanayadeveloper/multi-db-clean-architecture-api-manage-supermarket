import { Server } from "./presentation/server";
import { envs } from "./config/envs";
import { AppRoutes } from "./presentation/routes";
import { MongoDatabase } from "./infrastructure/database/mongo/mongo-database";



(async () => {
    main();
})();

async function main() {
    // db concect
    await MongoDatabase.connect({
        dbName: envs.MONGO_DB_NAME,
        mongoUrl: envs.MONGO_URL
    })

    // Start server
    const server = new Server({
        port: envs.PORT,
        routes: AppRoutes.routes
    });

    server.start();
}