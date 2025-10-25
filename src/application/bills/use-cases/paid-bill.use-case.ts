import { BillRepository } from "../../../domain/bills/repository/bill.repository";
import { InputNormalizerOrFail } from "../../../shared/helpers/input-normalizer-or-fail.helper";

export class PaidBill {
    constructor(private repository: BillRepository) { }
    execute(idBill: string) {
        return this.repository.payBill(idBill);
    }
} 