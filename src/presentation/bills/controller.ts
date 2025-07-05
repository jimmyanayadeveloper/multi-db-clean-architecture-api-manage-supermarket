import { Request, Response } from "express"

interface Bill {
    provider: string,
    value: number,
    dateIn: string,
    numberBill: string,
    creditDays: number
}

const bills: Bill[] = [
    {
        provider: "Proveedor A",
        value: 1500.75,
        dateIn: "2025-06-01T00:00:00.000Z",
        numberBill: "A-1001",
        creditDays: 30
    },
    {
        provider: "Proveedor B",
        value: 2340.00,
        dateIn: "2025-06-05T00:00:00.000Z",
        numberBill: "B-2034",
        creditDays: 15
    },
    {
        provider: "Proveedor C",
        value: 875.50,
        dateIn: "2025-06-10T00:00:00.000Z",
        numberBill: "C-5432",
        creditDays: 45
    },
    {
        provider: "Proveedor D",
        value: 3210.99,
        dateIn: "2025-06-15T00:00:00.000Z",
        numberBill: "D-8765",
        creditDays: 60
    },
    {
        provider: "Proveedor E",
        value: 1299.99,
        dateIn: "2025-06-20T00:00:00.000Z",
        numberBill: "E-1122",
        creditDays: 10
    }
];

export class BillsController {


    public getAllBills = (req: Request, res: Response): void => {
        res.json(bills);
        return
    }

    public addNewBill = (req: Request, res: Response): void => {
        const bill = req.body;
        if (!bill) {
            res.status(400).json({ error: 'Text property is required' });
            return
        }
        const newBill: Bill = { ...bill }
        bills.push(newBill)
        res.json(newBill);
        return
    }

    private _getBillByNumberId = (idNumber: string): Bill | null => {
        console.log(idNumber)
        const bill = bills.find(bill => bill.numberBill === idNumber);
        if (!bill) {
            return null;
        }
        return bill;
    }

    public updateBillById = (req: Request, res: Response): void => {
        const numberBill = req.params.numberBill;
        let billFind = this._getBillByNumberId(numberBill);
        if (!billFind) {
            res.status(400).json({ error: `Bill with id ${numberBill} not exits` });
            return
        }
        const updateData = req.body;
        Object.assign(billFind, updateData);
        res.json(billFind);
        return
    }

    public deleteBillById = (req: Request, res: Response) => {
        const numberBill = req.params.numberBill;
        const index = bills.findIndex(bill => bill.numberBill === numberBill);
        if (index === -1) {
            res.status(404).json({ error: `Bill with numberBill ${numberBill} not exist` });
            return
        }
        bills.splice(index, 1);
        res.json({ message: "Bill deleted, succesfully", bills });

    }
}