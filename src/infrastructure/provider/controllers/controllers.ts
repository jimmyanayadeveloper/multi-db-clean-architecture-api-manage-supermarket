import { Request, Response } from "express";

import { CreateProvider } from "../../../application/providers/use-cases/add-provider.use-case";
import { DeleteProvider } from "../../../application/providers/use-cases/delete-provider.use-case";
import { GetProviderById } from "../../../application/providers/use-cases/get-provider-by-id.use-case";
import { GetProviderByName } from "../../../application/providers/use-cases/get-provider-by-name.use-case";
import { GetProviderByNit } from "../../../application/providers/use-cases/get-provider-by-nit.use-case";
import { ProviderByTerm } from "../../../application/providers/use-cases/get-provider-term.use-case";
import { ShowAllProvider } from '../../../application/providers/use-cases/get-all-provider.use-case';
import { UpdateProvider } from "../../../application/providers/use-cases/update-provider.use-case";

import { UpdateProviderDto } from "../../../application/providers/dto/update-provider-dto";
import { RegisterProviderDto } from "../../../application/providers/dto/create-provider-dto";

import { InputNormalizerOrFail } from "../../../shared/helpers/input-normalizer-or-fail.helper";


interface ProviderControllerDeps {
    createProviderUseCase: CreateProvider;
    deleteProviderByIdUseCase: DeleteProvider;
    findProviderByIdUseCase: GetProviderById;
    findProviderByNameUseCase: GetProviderByName;
    findProviderByNitUseCase: GetProviderByNit;
    findProviderByTermUseCase: ProviderByTerm;
    showAllProvidersUseCase: ShowAllProvider;
    updateProviderByIdUseCase: UpdateProvider;
}

export class ProviderController {

    constructor(
        private readonly providerDependencies: ProviderControllerDeps
    ) { }

    public createNewProvider = async (req: Request, res: Response): Promise<void> => {
        const registerDto = RegisterProviderDto.create(req.body);
        const providerSaved = await this.providerDependencies.createProviderUseCase.execute(registerDto);
        res.status(201).json(providerSaved);
    }

    public getAllProviders = async (req: Request, res: Response): Promise<void> => {
        const providers = await this.providerDependencies.showAllProvidersUseCase.execute();
        res.status(200).json(providers);
    }

    public getProviderById = async (req: Request, res: Response): Promise<void> => {
        const idToFindProvider = InputNormalizerOrFail.uuid(req.params.id, 'Id to find provider');
        const provider = await this.providerDependencies.findProviderByIdUseCase.execute(idToFindProvider);
        res.status(200).json(provider);
    }

    public getProviderByNit = async (req: Request, res: Response): Promise<void> => {
        const provider = await this.providerDependencies.findProviderByNitUseCase.execute(req.params.nit);
        res.status(200).json(provider);
    }

    public getProviderByName = async (req: Request, res: Response): Promise<void> => {
        const provider = await this.providerDependencies.findProviderByNameUseCase.execute(req.params.name);
        res.status(200).json(provider);
    }

    public getProviderByTerm = async (req: Request, res: Response): Promise<void> => {
        const provider = await this.providerDependencies.findProviderByTermUseCase.execute(req.params.term);
        res.status(200).json(provider);
    }

    public updatedProviderById = async (req: Request, res: Response): Promise<void> => {
        const idToFindProvider = InputNormalizerOrFail.uuid(req.params.id, 'Id to find provider');
        const updateDto = UpdateProviderDto.create(req.body);
        const updatedProvider = await this.providerDependencies.updateProviderByIdUseCase.execute(idToFindProvider, updateDto);
        res.status(200).json(updatedProvider);
    }

    public deleteProviderById = async (req: Request, res: Response): Promise<void> => {
        const idToFindProvider = InputNormalizerOrFail.uuid(req.params.id, 'Id to find provider');
        await this.providerDependencies.deleteProviderByIdUseCase.execute(idToFindProvider);
        res.status(200).json({ message: `Provider with id ${idToFindProvider} was inactivated` });
    }
}