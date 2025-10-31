import { CustomError } from "../../../domain";
import { BillRepository } from "../../../domain/bills/repository/bill.repository";
import { ProviderRepository } from '../../../domain/providers/repository/provider.repository';

export class GetBillsByProvider {
    constructor(private repository: BillRepository, private repositoryProvider: ProviderRepository) { }
    async execute(idProvider: string) {
        const providerFoundById = await this.repositoryProvider.findById(idProvider);
        if (!providerFoundById) throw CustomError.notFound("Provider not found in the datasource");
        return this.repository.findByProvider(providerFoundById.id);
    }

}