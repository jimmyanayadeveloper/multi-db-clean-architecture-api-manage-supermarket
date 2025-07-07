import { Request, RequestHandler, Response, Router } from "express";
import { BillsController } from "./controllers";

export class BillsRoutes {
    static get routes(): Router {
        const router = Router();
        const billsController = new BillsController();
        router.get('/', billsController.getAllBills);
        router.post('/', billsController.addNewBill);
        router.put('/:numberBill', billsController.updateBillById);
        router.delete('/:numberBill', billsController.deleteBillById)
        return router;
    }
}
