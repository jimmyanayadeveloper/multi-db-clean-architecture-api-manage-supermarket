import { RegisterBillData } from "./register-bill-data";

export interface UpdateBillData {
    changes: Partial<RegisterBillData>;
}

/* import { Validators } from "../../../config";
import { UpdateProviderDto } from "../../providers";
import { BillEntity } from "../entities/bill.entity";
import { BillPartial } from "../interfaces/bill-partial.interface";

type UpdateBillResponse = [string?, UpdateBillDto?, Record<string, { old: any; new: any }>?]

export class UpdateBillDto {
    public provider?: string;
    public numberBill?: string;
    public amountBill?: number;
    public dateIn?: Date;
    public datePaid?: Date;
    public isPaid?: boolean;

    constructor({
        provider,
        numberBill,
        amountBill,
        dateIn,
        datePaid,
        isPaid
    }: Partial<BillPartial>) {
        this.provider = provider;
        this.numberBill = numberBill;
        this.amountBill = amountBill;
        this.dateIn = dateIn;
        this.datePaid = datePaid;
        this.isPaid = isPaid
    }

    static update(changesobj: Partial<BillPartial>, actualobj: BillEntity): UpdateBillResponse {
        const { hasChanges, diff } = Validators.hasChanges(changesobj, actualobj);
        const sanitizedChangesObj = Object.fromEntries(
            Object.entries(changesobj).filter(([__dirname, value]) => value != null)
        )
        if (!hasChanges) return ["No changesobj in the properties"]
        const updatedBill: Partial<BillPartial> = Object.assign({}, actualobj, sanitizedChangesObj);
        const billUpdated = new UpdateBillDto(updatedBill);
        return [undefined, billUpdated, diff]
    }
}

/* {
            provider: changesobj.provider ?? actualobj.provider,
            numberBill: changesobj.numberBill ?? actualobj.numberBill,
            amountBill: changesobj.amountBill ?? actualobj.amountBill,
            dateIn: changesobj.dateIn ?? actualobj.dateIn,
            datePaid: changesobj.datePaid ?? actualobj.datePaid,
            isPaid: changesobj.isPaid ?? actualobj.isPaid
        } */ 