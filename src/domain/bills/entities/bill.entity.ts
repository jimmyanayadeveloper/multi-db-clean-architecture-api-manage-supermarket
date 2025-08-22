export class BillEntity {
    constructor(
        public id: string,
        public provider: string,
        public numberBill: string,
        public amountBill: number,
        public dateIn: Date,
        public datePaid: Date,
        public isPaid: boolean,
    ) { }

    static create(props: {
        id?: string,
        provider: string,
        numberBill: string,
        amountBill: number,
        dateIn: Date,
        datePaid: Date,
        isPaid: boolean,
    }): BillEntity {
        if (props.amountBill < 0) throw new Error('Amount bill must be >= 0');
        if (props.datePaid < props.dateIn) throw new Error('date paid mus be >= dateIn');

        return new BillEntity(
            props.id ?? '',
            props.provider,
            props.numberBill,
            props.amountBill,
            props.dateIn,
            props.datePaid,
            props.isPaid
        )

    }
}