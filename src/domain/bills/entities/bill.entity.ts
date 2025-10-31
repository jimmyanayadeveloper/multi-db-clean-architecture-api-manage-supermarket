
import { ProviderMin } from "../../providers/interfaces/provider-summaries";
import { BillValidators } from "../validators/bill.validators";

export class BillEntity {
    private constructor(
        public id: string,
        public provider: ProviderMin,
        public numberBill: string,
        public amountBill: number,
        public dateIn: Date,
        public datePaid: Date,
        public isPaid: boolean,
    ) { }

    static create(props: {
        id?: string,
        provider: ProviderMin,
        numberBill: string,
        amountBill: number,
        dateIn: Date,
        datePaid: Date,
        isPaid: boolean,
    }): BillEntity {

        BillValidators.validateProvider(props.provider);
        BillValidators.validateNumberBill(props.numberBill);
        BillValidators.validateAmount(props.amountBill);
        BillValidators.validateDates(props.dateIn, props.datePaid);

        return new BillEntity(
            props.id ?? '',
            { id: props.provider.id, name: props.provider.name },
            props.numberBill,
            props.amountBill,
            props.dateIn,
            props.datePaid,
            props.isPaid
        )
    }

    static update(actual: BillEntity, changes: Partial<BillEntity>): BillEntity {
        const updated = { ...actual, ...changes };
        return BillEntity.create({
            id: actual.id,
            provider: actual.provider,
            numberBill: updated.numberBill,
            amountBill: updated.amountBill,
            dateIn: updated.dateIn,
            datePaid: updated.datePaid,
            isPaid: updated.isPaid
        }
        )
    }
}