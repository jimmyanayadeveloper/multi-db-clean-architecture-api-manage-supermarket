import { RegisterBillDto } from "../dto/register-bill-data";
import { BillEntity } from "../entities/bill.entity";


export interface RegisterUser {
    execute(dto: RegisterBillDto): Promise<BillEntity>
}