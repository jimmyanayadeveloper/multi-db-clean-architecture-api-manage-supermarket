import { Router } from "express";
import { BillsController } from "../../infrastructure/bills/controllers/controllers";

export class BillsRoutes {
    static routes({ billController }: { billController: BillsController }): Router {
        const router = Router();
        router.get('/show', billController.getAllBills);
        router.get('/summary', billController.getSummariesByStatusPaid);
        router.get('/summaries/:providerId', billController.getSummariesByStatusPaid);
        router.get('/by-provider/:providerId', billController.getBillsByProvider);
        router.get('/by-idbill/:numberBill', billController.getBillByNumberId);
        router.get('/status/:status', billController.getBillsStatus)
        router.post('/register', billController.addNewBill);
        router.put('/edit/:id', billController.updateBillById);
        router.patch('/pay/:id', billController.paidBill);
        return router;
    }
}
