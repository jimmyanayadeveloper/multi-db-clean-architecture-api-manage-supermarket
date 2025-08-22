import { Router } from "express";
import { BillsController } from "./controllers";

export class BillsRoutes {
    static routes({ billController }: { billController: BillsController }): Router {
        const router = Router();

        router.get('/show', billController.getAllBills)
        router.get('/by-provider/:providerId', billController.getBillByProvider);
        router.get('/:numberBill', billController.getBillByNumberId);
        router.get('/status/:status', billController.getBillsStatus)
        router.post('/register', billController.addNewBill);
        router.put('/edit/:term', billController.updateBillById);
        router.patch('/:providerId/:numberBill/pay', billController.paidBill);



        /* 
        router.get('/register', billController.getAllBills);
        router.put('/:numberBill', billsController.updateBillById);
        router.delete('/:numberBill', billsController.deleteBillById) */
        return router;
    }
}
