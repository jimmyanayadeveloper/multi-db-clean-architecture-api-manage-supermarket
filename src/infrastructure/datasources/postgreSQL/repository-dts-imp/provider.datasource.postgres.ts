import { CreateProviderDto, ProviderDatasource, ProviderEntity, UpdateProviderDto } from "../../../../domain/providers";
import { ProviderMapper } from "../../../mappers/provider.mapper";
import { ProviderDts } from "../entities/provider.entities";
import { PostgresDatabase } from "../postgres-database";

export class ProviderDatasourceImp implements ProviderDatasource {

    private repo = PostgresDatabase.datasource.getRepository(ProviderDts);

    async create(createProvider: CreateProviderDto): Promise<ProviderEntity> {
        const providerSaved = await this.repo.save(this.repo.create(createProvider))
        return ProviderMapper.toEntity(providerSaved);
    }

    async edit(id: string, changes: UpdateProviderDto): Promise<ProviderEntity | null> {
        const provider = await this.repo.findOne({ where: { id } });
        if (!provider) return null;
        Object.assign(provider, changes);
        const providerUpdate = await this.repo.save(provider);
        return ProviderMapper.toEntity(providerUpdate)
    }

    async findById(id: string): Promise<ProviderEntity | null> {
        const provider = await this.repo.findOne({ where: { id } });
        if (!provider) return null;
        return ProviderMapper.toEntity(provider);
    }

    async findByNit(nit: string): Promise<ProviderEntity | null> {
        const provider = await this.repo.findOne({ where: { nit } });
        if (!provider) return null;
        return ProviderMapper.toEntity(provider);
    }

    async findByTerm(term: string): Promise<ProviderEntity[]> {
        const providersMatchToTerm = await this.repo
            .createQueryBuilder("provider")
            .where("provider.name ILIKE :term", { term: `%${term}%` })
            .orWhere("provider.nit ILIKE :term", { term: `%${term}%` })
            .getMany();
        return ProviderMapper.toEntities(providersMatchToTerm);
    }

    async inactivate(id: string): Promise<boolean> {
        const provider = await this.repo.findOne({ where: { id } });
        if (!provider) return false;
        provider.isActive = false;
        await this.repo.save(provider);
        return true;
    }

    async showAll(): Promise<ProviderEntity[]> {
        const providers = await this.repo.find()
        return ProviderMapper.toEntities(providers);
    }
}