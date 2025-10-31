import { Request, Response } from "express"

import { CustomError } from "../../../domain";

import { GetAllBills } from "../../../application/bills/use-cases/get-all-bills.use-case";
import { GetBillByNumberID } from "../../../application/bills/use-cases/get-bill-by-id.use-case";
import { GetBillByNumberIdBillDto } from "../../../application/bills/dto/get-bill-by-number.dto";
import { GetBillsByProvider } from "../../../application/bills/use-cases/get-bills-by-provider.use-case";
import { GetBillsByStatus } from "../../../application/bills/use-cases/get-bill-by-status.use-case";
import { GetSummariesBillByStatusPaid } from "../../../application/bills/use-cases/get-summaries-by-status-paid.use-case";
import { PaidBill } from "../../../application/bills/use-cases/paid-bill.use-case";
import { parsePagination } from "../../shared/parsers/pagination.parser";
import { RegisterBill } from "../../../application/bills/use-cases/register-bill.use-case";
import { RegisterBillDto } from "../../../application/bills/dto/register-bill.dto";
import { UpdateBill } from "../../../application/bills/use-cases/update-bill.use-case";
import { UpdateBillDto } from "../../../application/bills/dto/update-bill.dto";
import { InputNormalizerOrFail } from "../../../shared/helpers/input-normalizer-or-fail.helper";


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

    public getAllBills = async (req: Request, res: Response): Promise<void> => {
        const pagination = parsePagination(req.query);
        const bills = await this.billDependencies.showAllBills.execute(pagination);
        res.status(200).json(bills);
    }

    public addNewBill = async (req: Request, res: Response): Promise<void> => {
        const registerDto = RegisterBillDto.create(req.body);
        const billSaved = await this.billDependencies.registerNewBillUseCase.execute(registerDto);
        res.status(201).json(billSaved);
    }

    public getBillByNumberId = async (req: Request, res: Response): Promise<void> => {
        const dto = GetBillByNumberIdBillDto.create(req.params.numberBill);
        const billFound = await this.billDependencies.getBillByNumberBillUseCase.execute(dto.idBill);
        res.status(200).json(billFound)
    }

    public getBillsByProvider = async (req: Request, res: Response): Promise<void> => {
        const billsByProvider = await this.billDependencies.getBillsByProvider.execute(req.params.providerId)
        res.status(200).json(billsByProvider)
    }

    public paidBill = async (req: Request, res: Response): Promise<void> => {
        const idToFindBill = InputNormalizerOrFail.uuid(req.params.id, 'Id to find bill to paid it');
        const billPaid = await this.billDependencies.paidBill.execute(idToFindBill);
        res.status(200).json(billPaid);
    }

    public updateBillById = async (req: Request, res: Response): Promise<void> => {
        const idToFindBill = InputNormalizerOrFail.uuid(req.params.id, 'Id to find bill to update');
        const dto = UpdateBillDto.create(req.body)
        const billUpdate = await this.billDependencies.updateBill.execute(idToFindBill, dto.updateBillData);
        res.status(200).json(billUpdate)
    }

    public getBillsStatus = async (req: Request, res: Response): Promise<void> => {
        const billsByStatusActive = await this.billDependencies.getBillsByStatus.execute(req.params.status)
        res.status(200).json(billsByStatusActive);
    }

    public getSummariesByStatusPaid = async (req: Request, res: Response): Promise<void> => {
        const providerId = req.params.providerId;
        if (providerId) {
            const idToFindBill = InputNormalizerOrFail.uuid(req.params.id, 'Id to find bill to get summary by provider');
            const billsWithSummarySlitStatusPaid = await this.billDependencies.getSummariesSlipByPaidStatus.execute(idToFindBill);
            res.status(200).json(billsWithSummarySlitStatusPaid)
            return
        }

        const billsWithSummarySlitStatusPaid = await this.billDependencies.getSummariesSlipByPaidStatus.execute();
        res.status(200).json(billsWithSummarySlitStatusPaid);
    }

}