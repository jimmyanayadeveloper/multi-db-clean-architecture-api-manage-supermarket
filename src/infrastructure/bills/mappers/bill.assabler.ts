import { BillEntity } from '../../../domain/bills/entities/bill.entity';
import { BillDts } from '../../datasources/postgreSQL/entities/bill.entities';

export class BillAssembler {
    static toEntity(dtsEntity: BillDts): BillEntity {
        return BillEntity.create({
            id: dtsEntity.id ?? '',
            provider: {
                id: dtsEntity.providerId ?? '',
                name: dtsEntity.provider?.name ?? 'Nombre no disponible'
            },
            numberBill: dtsEntity.numberBill,
            amountBill: dtsEntity.amountBill,
            dateIn: new Date(dtsEntity.dateBill),
            datePaid: new Date(dtsEntity.payBillDate),
            isPaid: dtsEntity.isPaid
        }
        );
    }

    static toEntities(bills: BillDts[]): BillEntity[] {
        return bills.map(this.toEntity)
    }
}