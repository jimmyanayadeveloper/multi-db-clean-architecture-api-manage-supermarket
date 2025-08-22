import { BillRepository } from "../../../domain/bills/repository/bill.repository";


export class GetBillsByProvider {
    constructor(private repository: BillRepository) { }

    execute(idProvider: string) {
        return this.repository.findByProvider(idProvider);
    }

}