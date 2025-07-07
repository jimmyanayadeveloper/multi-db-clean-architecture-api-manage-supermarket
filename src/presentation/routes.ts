import { Router } from "express";
import { BillsRoutes } from "./bills/routes";
import { ProvidersRoutes } from "./providers/routes";

export class AppRoutes {
    static get routes(): Router {
        const router = Router();
        router.use('/api/bills', BillsRoutes.routes);
        router.use('/api/providers', ProvidersRoutes.routes);
        return router
    }
}