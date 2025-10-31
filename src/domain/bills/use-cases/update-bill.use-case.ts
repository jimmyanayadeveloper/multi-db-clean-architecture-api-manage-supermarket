import { DeepPartial } from "typeorm";
import { RegisterBillRequest } from "../interface/dto/update-bill-request.interface";
import { BillEntity } from "../entities/bill.entity";

export interface UpdateBillUseCase {
    execute(billId: string, billUpdate: Partial<BillEntity>): Promise<BillEntity>
}