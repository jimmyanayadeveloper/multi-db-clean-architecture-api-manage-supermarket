import { Router } from "express";
import { BillsRoutes } from "./bills/routes";

export class AppRoutes {
    static get routes(): Router {
        const router = Router();
        router.use('/api/bills', BillsRoutes.routes)
        return router
    }
}