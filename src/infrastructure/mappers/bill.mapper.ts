import { DeepPartial } from 'typeorm';
import { BillEntity } from '../../domain/bills/entities/bill.entity';
import { BillDts } from "../database/postgreSQL/entities/bill.entities";


export class BillMapper {
    static toEntity(dtsEntity: BillDts): BillEntity {
        return new BillEntity(
            dtsEntity.id,
            dtsEntity.providerId,
            dtsEntity.numberBill,
            dtsEntity.amountBill,
            dtsEntity.dateBill,
            dtsEntity.payBillDate,
            dtsEntity.isPaid
        );
    }

    static toEntities(bills: BillDts[]): BillEntity[] {
        return bills.map(this.toEntity)
    }

    static toDts(entity: BillEntity): DeepPartial<BillDts> {
        return {
            numberBill: entity.numberBill,
            amountBill: entity.amountBill,
            dateBill: entity.dateIn,
            payBillDate: entity.datePaid,
            providerId: entity.provider,
            isPaid: entity.isPaid
        }
    }
}