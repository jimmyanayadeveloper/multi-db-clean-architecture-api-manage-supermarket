import { BillRepository } from "../../../domain/bills/repository/bill.repository";
import { BillDomainService } from "../../../domain/bills/services/bill-domain.service";

export class PaidBill {
    constructor(private repository: BillRepository) { }
    async execute(idBill: string) {
        await BillDomainService.billWasPaid(this.repository, idBill);
        const billPaid = await this.repository.payBill(idBill);
        return billPaid;
    }
} 