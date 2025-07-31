import { Router } from "express";
import { BillsRoutes } from "./bills/routes";
import { ProvidersRoutes } from "./providers/routes";
import { AuthRoutes } from "./auth/routes";

export class AppRoutes {
    static routes(dependencies: any): Router {
        const router = Router();
        router.use('/api/bills', BillsRoutes.routes);
        router.use('/api/providers', ProvidersRoutes.routes(dependencies));
        router.use('/api/auth', AuthRoutes.routes(dependencies));
        return router
    }
}