import { Router } from "express";

export class BillsRoutes {
    static get routes(): Router {
        const router = Router();
        router.get('/', (req, res) => {
            res.json('Hola todo bien')
        })
        return router;
    }
}