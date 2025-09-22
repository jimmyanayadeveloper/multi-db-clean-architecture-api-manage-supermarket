import { BillDatasource } from "../../../../domain/bills/datasource/bill.datasource";
import { BillEntity } from "../../../../domain/bills/entities/bill.entity";
import { PostgresDatabase } from "../postgres-database";
import { BillDts } from "../entities/bill.entities";

import { BillAssembler } from "../../../bills/mappers/bill.assabler";
import { BillMapper } from "../../../bills/mappers/bill.mapper";
import { Pagination } from '../../../../domain/common/pagination';
import { BillsSummariesByPaidStatus, BillsSummary } from "../../../../domain/bills/interfaces/dto/response/response.dto";
import { BillPaidFilter } from "../../../../domain/bills/interfaces/request";

export class BillDatasourceImp implements BillDatasource {
    private repo = PostgresDatabase.datasource.getRepository(BillDts)
    async getSummarySlipByPaidStatus(providerId?: string): Promise<BillsSummariesByPaidStatus> {
        const queryBuilder = this.repo.createQueryBuilder("bill")
            .select("bill.isPaid", "isPaid")
            .addSelect("COUNT(bill.id)", "countBills")
            .addSelect("SUM(bill.amountBill)", "totalAmount");

        if (providerId) queryBuilder.andWhere("bill.providerId = :providerId", { providerId });

        queryBuilder.groupBy("bill.isPaid");


        const raw = await queryBuilder.getRawMany<{ isPaid: boolean | string; countBills: string; totalAmount: string }>();

        const normalize = (v: any) => v === true || v === "true";
        const paid = raw.find(r => normalize(r.isPaid) === true) ?? { countBills: "0", totalAmount: "0" };
        const unpaid = raw.find(r => normalize(r.isPaid) === false) ?? { countBills: "0", totalAmount: "0" }
        const all = {
            countBills: Number(paid.countBills) + Number(unpaid.countBills),
            totalAmount: Number(paid.totalAmount) + Number(unpaid.totalAmount)
        };

        return {
            paid: {
                countBills: Number(paid.countBills),
                totalAmount: Number(paid.totalAmount)
            },
            unpaid: {
                countBills: Number(unpaid.countBills),
                totalAmount: Number(unpaid.totalAmount)
            },
            all
        }
    }

    async edit(id: string, changes: Partial<BillEntity>): Promise<BillEntity | null> {
        const bill = await this.repo.findOne({ where: { id } });
        if (!bill) return null;
        Object.assign(bill, changes);
        const billUpdate = await this.repo.save(bill);
        return BillAssembler.toEntity(billUpdate);
    }

    async findByNumberBill(numberBill: string): Promise<BillEntity[]> {
        const billsFound = await this.repo.find({
            where: { numberBill },
            relations: ['provider'],
        })
        return BillAssembler.toEntities(billsFound);
    }

    async findByNumberBillAndProvider(numberBill: string, providerId: string): Promise<BillEntity | null> {
        const billFound = await this.repo.findOne({
            where: { numberBill, provider: { id: providerId } },
            relations: ['provider'],
        });
        if (!billFound) return null;
        return BillAssembler.toEntity(billFound);
    }

    async findByProvider(idProvider: string): Promise<BillEntity[]> {
        const billFound = await this.repo.find({
            where: { provider: { id: idProvider } },
            relations: ['provider'],
        });
        return BillAssembler.toEntities(billFound);
    }

    async payBill(id: string, paidDate: Date = new Date()): Promise<BillEntity | null> {
        const billFound = await this.repo.findOne({ where: { id }, relations: ['provider'] });
        if (!billFound) return null;
        billFound.isPaid = true;
        billFound.payBillDate = paidDate;
        const billPaid = await this.repo.save(billFound);
        return BillAssembler.toEntity(billPaid);
    }

    async register(dataBill: BillEntity): Promise<BillEntity | null> {
        const billDtsMapper = BillMapper.toDts(dataBill)
        const billSaved = await this.repo.save(this.repo.create(billDtsMapper));
        const response = await this.findByNumberBillAndProvider(billSaved.numberBill, billSaved.providerId)
        return response
    }

    async showAll({ page, limit }: Pagination): Promise<[BillEntity[], number]> {
        const [bills, total] = await this.repo.findAndCount({
            relations: ['provider'],
            skip: (page - 1) * limit,
            take: limit,
        });

        return [BillAssembler.toEntities(bills), total];
    }

    async showAllBillByStatus(status: boolean): Promise<BillEntity[]> {
        const billFounds = await this.repo.find({
            where: { isPaid: status },
            relations: ['provider'],
        });
        return BillAssembler.toEntities(billFounds);
    }

    async findById(id: string): Promise<BillEntity[] | null> {
        throw new Error("Method not implemented.");
    }

    async getSummary(filters?: { providerId?: string; isPaid?: BillPaidFilter }): Promise<BillsSummary> {
        const queryBuilder = this.repo.createQueryBuilder("bill")
            .select("COUNT(bill.id)", "countBills")
            .addSelect("SUM(bill.amountBill)", "totalAmount");

        if (filters?.providerId)
            queryBuilder.andWhere("bill.providerId = :providerId", { providerId: filters?.providerId });

        if (filters?.isPaid !== undefined)
            queryBuilder.andWhere("bill.isPaid = :isPaid", { isPaid: filters.isPaid });

        const data = await queryBuilder.getRawOne<{ countBills: string; totalAmount: string }>()

        return {
            countBills: Number(data?.countBills ?? 0),
            totalAmount: Number(data?.totalAmount ?? 0)
        }
    }
}