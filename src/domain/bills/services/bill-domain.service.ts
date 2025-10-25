import { CustomError } from "../../errors/custom.error";
import { BillRepository } from "../repository/bill.repository";

export class BillDomainService {
    static async uniqueIdBill(repo: BillRepository, idBill: string, idProvider: string): Promise<void> {
        const billFound = await repo.findByNumberBillAndProvider(idBill, idProvider);
        if (billFound) throw CustomError.conflict(`Datasource has a bill with this bill: ${idBill} `)
    }
}