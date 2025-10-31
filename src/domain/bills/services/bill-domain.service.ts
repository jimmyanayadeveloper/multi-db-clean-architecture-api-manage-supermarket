import { BillRepository } from '../repository/bill.repository';
import { CustomError } from "../../errors/custom.error";
import { ProviderRepository } from '../../providers/repository/provider.repository';

export class BillDomainService {
    static async uniqueIdBill(repo: BillRepository, idBill: string, idProvider: string): Promise<void> {
        const billFound = await repo.findByNumberBillAndProvider(idBill, idProvider);
        if (billFound) throw CustomError.conflict(`Datasource has a bill with this number bill: ${idBill}`)
    }

    static async allowsCredit(repo: ProviderRepository, idProvider: string, creditDays: number): Promise<void> {
        const providerFound = await repo.findById(idProvider);
        if (!providerFound) throw CustomError.notFound(`Provider with id ${idProvider} not found`);
        if (providerFound.creditDays === 0) throw CustomError.conflict(`${providerFound.name} does not allow sales on credit`);
        if (providerFound.creditDays < creditDays) throw CustomError.conflict(`${providerFound.name} only allows up to ${providerFound.creditDays} credit days`);
    }

    static async billWasPaid(repo: BillRepository, idBill: string): Promise<void> {
        const billFound = await repo.findById(idBill);
        if (!billFound) throw CustomError.notFound(`Don't find bill with this ${idBill}`);
        if (billFound.isPaid) throw CustomError.conflict(`Bill with id: ${idBill} was cancelled before`);
    }
}