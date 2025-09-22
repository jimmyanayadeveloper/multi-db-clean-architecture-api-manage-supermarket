import { Request, Response } from "express"

import { CustomError } from "../../../domain";

import { GetAllBills } from "../../../application/bills/use-cases/get-all-bills.use-case";
import { GetBillByNumberDto } from "../../../application/bills/dto/get-bill-by-number.dto";
import { GetBillByNumberID } from "../../../application/bills/use-cases/get-bill-by-id.use-case";
import { GetBillsByProvider } from "../../../application/bills/use-cases/get-bills-by-provider.use-case";
import { GetBillsByStatus } from "../../../application/bills/use-cases/get-bill-by-status.use-case";
import { GetSummariesBillByStatusPaid } from "../../../application/bills/use-cases/get-summaries-by-status-paid.use-case";
import { PaidBill } from "../../../application/bills/use-cases/paid-bill.use-case";
import { RegisterBill } from "../../../application/bills/use-cases/register-bill.use-case";
import { UpdateBill } from "../../../application/bills/use-cases/update-bill.use-case";

import { BillResponseAssembler } from './dto/response/assembler-bill-response';
import { FindBillByIdDto } from "./dto/request/get-by-id.dto";
import { parsePagination } from "../../shared/parsers/pagination.parser";
import { RegisterBillDto } from "./dto/request/register-bill.dto";
import { UpdateBillDto } from "./dto/request/update-bill.dto";


interface BillControllerDeps {
    getBillByNumberBillUseCase: GetBillByNumberID;
    getBillsByProvider: GetBillsByProvider;
    getBillsByStatus: GetBillsByStatus;
    getSummariesSlipByPaidStatus: GetSummariesBillByStatusPaid;
    paidBill: PaidBill
    registerNewBillUseCase: RegisterBill;
    showAllBills: GetAllBills;
    updateBill: UpdateBill;
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
        const pagination = parsePagination(req.query);
        this.billDependencies.showAllBills
            .execute(pagination)
            .then(data => res.status(200).json(data))
            .catch(error => this.handleError(error, res))
    }

    public addNewBill = (req: Request, res: Response): void => {
        const registerDto = RegisterBillDto.createRegisterBillDto(req.body);
        if (!registerDto.ok) {
            const error = registerDto.error as CustomError;
            res.status(error.statusCode).json({ message: error.message });
            return;
        };
        this.billDependencies.registerNewBillUseCase
            .execute(registerDto.value)
            .then(data => res.status(201).json(BillResponseAssembler.toResponse(data)))
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
        const findBillIdDto = FindBillByIdDto.create(req.params.id);
        if (!findBillIdDto.ok) {
            const error = findBillIdDto.error as CustomError;
            res.status(error.statusCode).json({ message: error.message });
            return;
        }
        this.billDependencies.paidBill
            .execute(findBillIdDto.value.id)
            .then(data => res.status(200).json(data))
            .catch(error => this.handleError(error, res))
    }

    public updateBillById = (req: Request, res: Response): void => {
        const responseDto = UpdateBillDto.create(req.body)
        if (!responseDto.ok) {
            res.status(400).json(responseDto.error);
            return;
        }
        this.billDependencies.updateBill
            .execute(req.params.term, responseDto.value.updateBillData)
            .then(data => res.status(200).json(data))
            .catch(error => this.handleError(error, res))
    }

    public getBillsStatus = (req: Request, res: Response): void => {
        this.billDependencies.getBillsByStatus
            .execute(req.params.status)
            .then(data => res.status(200).json(data))
            .catch(error => this.handleError(error, res))
    }

    public getSummariesByStatusPaid = (req: Request, res: Response): void => {
        const providerId = req.params.providerId
        this.billDependencies.getSummariesSlipByPaidStatus
            .execute(providerId)
            .then(data => res.status(200).json(data))
            .catch(error => this.handleError(error, res))
    }

}