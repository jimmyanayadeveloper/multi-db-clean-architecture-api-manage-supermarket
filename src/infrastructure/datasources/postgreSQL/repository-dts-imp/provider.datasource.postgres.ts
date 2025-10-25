import { PostgresDatabase } from "../postgres-database";
import { ProviderDatasource, ProviderEntity } from "../../../../domain/providers";
import { ProviderDts } from "../entities/provider.entities";
import { ProviderMapper } from "../../../provider/mappers/provider.mapper";
import { ILike } from "typeorm";

export class ProviderDatasourceImp implements ProviderDatasource {

    private repo = PostgresDatabase.datasource.getRepository(ProviderDts);

    async create(createProvider: ProviderEntity): Promise<ProviderEntity> {
        const provider = ProviderMapper.toDts(createProvider);
        const providerSaved = await this.repo.save(this.repo.create(provider));
        return ProviderMapper.toEntity(providerSaved);
    }

    async edit(providerDataChange: ProviderEntity): Promise<ProviderEntity> {
        const providerUpdate = await this.repo.save(providerDataChange);
        return ProviderMapper.toEntity(providerUpdate)
    }

    async findById(id: string): Promise<ProviderEntity | null> {
        const provider = await this.repo.findOne({ where: { id } });
        return provider ? ProviderMapper.toEntity(provider) : null;
    }

    async findByNit(nit: string): Promise<ProviderEntity | null> {
        const provider = await this.repo.findOne({ where: { nit } });
        return provider ? ProviderMapper.toEntity(provider) : null;
    }

    async findByName(name: string): Promise<ProviderEntity | null> {
        const provider = await this.repo.findOne({ where: { name: ILike(name) } });
        return provider ? ProviderMapper.toEntity(provider) : null;
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