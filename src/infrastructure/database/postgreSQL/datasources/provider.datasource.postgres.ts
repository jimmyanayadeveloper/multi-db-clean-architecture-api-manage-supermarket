import { CreateProviderDto, ProviderDatasource, ProviderEntity, UpdateProviderDto } from "../../../../domain/providers";
import { ProviderMapper } from "../../../mappers/provider.mapper";
import { Provider } from "../entities/provider.entities";
import { PostgresDatabase } from "../postgres-database";

export class ProviderDatasourceImp implements ProviderDatasource {

    private repo = PostgresDatabase.datasource.getRepository(Provider);

    async create(createProvider: CreateProviderDto): Promise<ProviderEntity> {
        const providerSaved = await this.repo.save(this.repo.create(createProvider))
        return ProviderMapper.toEntity(providerSaved);
    }

    async findByTerm(term: string): Promise<ProviderEntity[]> {
        const providersMatchToTerm = await this.repo
            .createQueryBuilder("provider")
            .where("provider.name ILIKE :term", { term: `%${term}%` })
            .orWhere("provider.nit ILIKE :term", { term: `%${term}%` })
            .getMany();
        return ProviderMapper.toEntities(providersMatchToTerm);
    }

    async showAll(): Promise<ProviderEntity[]> {
        const providers = await this.repo.find()
        return ProviderMapper.toEntities(providers);
    }

    edit(updateProvider: UpdateProviderDto): Promise<ProviderEntity> {
        throw new Error("Method not implemented.");
    }

    inactive(): void {

    }
}