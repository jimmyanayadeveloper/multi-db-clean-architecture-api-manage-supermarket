import { Request, Response } from "express"
import { InMemoriaBillRepository } from "../../infrastructure/database/bills.repository.memory";
import { GetAllBills } from "../../application/bills/use-cases/get-all-bills.use-case";
import { AddBill } from "../../application/bills/use-cases/add-bill.use-case";
import { UpdateBill } from "../../application/bills/use-cases/update-bill.use-case";
import { DeleteBill } from "../../application/bills/use-cases/delete-bill.use-case";
import { GetBillByNumberID } from "../../application/bills/use-cases/get-bill-by-id.use-case";
import { Bill } from "../../domain/bills/bill.entity";

const repository = new InMemoriaBillRepository();

export class BillsController {

    private getAll = new GetAllBills(repository);
    private add = new AddBill(repository);
    private update = new UpdateBill(repository);
    private remove = new DeleteBill(repository);
    private findByNumberId = new GetBillByNumberID(repository);

    public getAllBills = (req: Request, res: Response): void => {
        const bills = this.getAll.execute();
        res.json(bills);
    }

    public addNewBill = (req: Request, res: Response): void => {
        const newBill = this.add.execute(req.body);
        res.status(201).json(newBill);
    }

    public getBillByNumberId = (idNumber: string): Bill | null => {
        const billFindedById = this.findByNumberId.execute(idNumber);
        return billFindedById
    }

    public updateBillById = (req: Request, res: Response): void => {
        const billUpdate = this.update.execute(req.params.term, req.body);
        res.json(billUpdate);
    }

    public deleteBillById = (req: Request, res: Response) => {
        this.remove.execute(req.params.term);
        res.json("Factura eliminada");
    }
}