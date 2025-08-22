import { Request, Response } from "express"

import { CustomError } from "../../domain";

import { GetAllBills } from "../../application/bills/use-cases/get-all-bills.use-case";
import { GetBillByNumberDto } from "../../application/bills/dto/get-bill-by-number.dto";
import { GetBillByNumberID } from "../../application/bills/use-cases/get-bill-by-id.use-case";
import { GetBillsByProvider } from "../../application/bills/use-cases/get-bills-by-provider.use-case";
import { GetBillsByStatus } from "../../application/bills/use-cases/get-bill-by-status.use-case";
import { PaidBill } from "../../application/bills/use-cases/paid-bill.use-case";
import { RegisterBill } from "../../application/bills/use-cases/register-bill.use-case";
import { RegisterBillDto } from "../../application/bills/dto/register-bill.dto";
import { UpdateBill } from "../../application/bills/use-cases/update-bill.use-case";

interface BillControllerDeps {
    registerNewBillUseCase: RegisterBill;
    getBillByNumberBillUseCase: GetBillByNumberID;
    getBillsByProvider: GetBillsByProvider;
    getBillsByStatus: GetBillsByStatus;
    paidBill: PaidBill
    showAllBills: GetAllBills;
    updateBill: UpdateBill
}

export class BillsController {

    constructor(
        private readonly billDependencies: BillControllerDeps
    ) { }

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) return res.status(error.statusCode).json({ error: error.message })
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }

    public getAllBills = (req: Request, res: Response): void => {
        this.billDependencies.showAllBills
            .execute()
            .then(data => res.status(200).json(data))
            .catch(error => this.handleError(error, res))
    }

    public addNewBill = (req: Request, res: Response): void => {
        const registerDto = RegisterBillDto.createRegisterBillDto(req.body);
        if (!registerDto.ok) {
            res.status(400).json(registerDto.error);
            return;
        };
        this.billDependencies.registerNewBillUseCase
            .execute(registerDto.value)
            .then(data => res.status(201).json(data))
            .catch(error => this.handleError(error, res))
    }

    public getBillByNumberId = (req: Request, res: Response): void => {
        const responseDto = GetBillByNumberDto.createGetBillByIdDto(req.params.numberBill);
        if (!responseDto.ok) {
            res.status(400).json(responseDto.error);
            return;
        }
        this.billDependencies.getBillByNumberBillUseCase
            .execute(responseDto.value.id)
            .then(data => res.status(200).json(data))
            .catch(error => this.handleError(error, res))
    }

    public getBillByProvider = (req: Request, res: Response): void => {
        const provider = req.params.providerId
        if (!provider) {
            res.status(400).json("provider required");
            return;
        }
        this.billDependencies.getBillsByProvider
            .execute(provider)
            .then(data => res.status(200).json(data))
            .catch(error => this.handleError(error, res))
    }

    public paidBill = (req: Request, res: Response): void => {
        const { numberBill, providerId } = req.params;
        this.billDependencies.paidBill
            .execute(numberBill, providerId)
            .then(data => res.status(200).json(data))
            .catch(error => this.handleError(error, res))
    }

    public updateBillById = (req: Request, res: Response): void => {
        this.billDependencies.updateBill
            .execute(req.params.term, req.body)
            .then(data => res.status(200).json(data))
            .catch(error => this.handleError(error, res))
    }

    public getBillsStatus = (req: Request, res: Response): void => {
        this.billDependencies.getBillsByStatus
            .execute(req.params.status)
            .then(data => res.status(200).json(data))
            .catch(error => this.handleError(error, res))
    }
}