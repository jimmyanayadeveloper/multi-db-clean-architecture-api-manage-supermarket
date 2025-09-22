import { DeepPartial } from "typeorm";
import { BillEntity } from "../../../domain/bills/entities/bill.entity";
import { BillDts } from "../../datasources/postgreSQL/entities/bill.entities";

export class BillMapper {

    static toDts(entity: Partial<BillEntity>): DeepPartial<BillDts> {
        return {
            numberBill: entity.numberBill,
            amountBill: entity.amountBill,
            dateBill: entity.dateIn,
            payBillDate: entity.datePaid,
            providerId: entity.provider!.id,
            isPaid: entity.isPaid
        }
    }

}

