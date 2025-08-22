import { BillDatasource } from "../../../../domain/bills/datasource/bill.datasource";
import { BillEntity } from "../../../../domain/bills/entities/bill.entity";
import { BillMapper } from "../../../mappers/bill.mapper";
import { BillDts } from "../entities/bill.entities";
import { PostgresDatabase } from "../postgres-database";

export class BillDatasourceImp implements BillDatasource {

    private repo = PostgresDatabase.datasource.getRepository(BillDts)

    async edit(id: string, changes: Partial<BillEntity>): Promise<BillEntity | null> {
        const bill = await this.repo.findOne({ where: { id } });
        if (!bill) return null;
        Object.assign(bill, changes);
        const billUpdate = await this.repo.save(bill);
        return BillMapper.toEntity(billUpdate);
    }

    async findByNumberBill(numberBill: string): Promise<BillEntity[]> {
        const billsFound = await this.repo.find({
            where: { numberBill }
        })
        return BillMapper.toEntities(billsFound);
    }

    async findByNumberBillAndProvider(numberBill: string, providerId: string): Promise<BillEntity | null> {
        const billFound = await this.repo.findOne({
            where: { numberBill, provider: { id: providerId } },
        });
        if (!billFound) return null;
        return BillMapper.toEntity(billFound);
    }

    async findByProvider(idProvider: string): Promise<BillEntity[]> {
        const billFound = await this.repo.find({
            where: { provider: { id: idProvider } }
        });
        return BillMapper.toEntities(billFound);
    }

    async payBill(numberBill: string, providerId: string, paidDate: Date = new Date()): Promise<BillEntity | null> {
        const billFound = await this.repo.findOne({
            where: { numberBill, provider: { id: providerId } }
        });
        if (!billFound) return null;
        billFound.isPaid = true;
        billFound.payBillDate = paidDate;
        const billPaid = await this.repo.save(billFound);
        return BillMapper.toEntity(billPaid);
    }

    async register(dataBill: BillEntity): Promise<BillEntity> {
        const toDts = BillMapper.toDts(dataBill);
        const billSaved = await this.repo.save(this.repo.create(toDts));
        return BillMapper.toEntity(billSaved)
    }

    async showAll(): Promise<BillEntity[]> {
        const bills = await this.repo.find();
        return BillMapper.toEntities(bills);
    }

    async showAllBillByStatus(status: boolean): Promise<BillEntity[]> {
        const billFounds = await this.repo.find({
            where: { isPaid: status }
        });
        return BillMapper.toEntities(billFounds);
    }

    findById(id: string): Promise<BillEntity[] | null> {
        throw new Error("Method not implemented.");
    }
}