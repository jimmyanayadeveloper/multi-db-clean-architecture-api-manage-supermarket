import { CustomError } from "../../errors/custom.error";
import { ProviderRepository } from "../repository/provider.repository";

export class ProviderDomainService {

    static async uniqueNit(repo: ProviderRepository, nit: string): Promise<void> {
        const providerFound = await repo.findByNit(nit);
        if (providerFound) throw CustomError.conflict(`Datasource has a provider  with this NIT: ${nit}`);
    }

    static async uniqueName(repo: ProviderRepository, name: string): Promise<void> {
        const providerFound = await repo.findByTerm(name);
        if (providerFound.length !== 0) throw CustomError.conflict(`Datasource has a provider with this name: ${name}`)
    }

}