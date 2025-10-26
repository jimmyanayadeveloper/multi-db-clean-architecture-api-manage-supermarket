import { Request, Response } from "express";

import { CustomError } from "../../../domain";
import { ProviderEntity, RegisterProviderDto } from "../../../domain/providers";

import { CreateProvider } from "../../../application/providers/use-cases/add-provider.use-case";
import { DeleteProvider } from "../../../application/providers/use-cases/delete-provider.use-case";
import { ShowAllProvider } from '../../../application/providers/use-cases/get-all-provider.use-case';
import { ProviderByTerm } from "../../../application/providers/use-cases/get-provider-term.use-case";
import { UpdateProvider } from "../../../application/providers/use-cases/update-provider.use-case";
import { UpdateProviderDto } from "../../../application/providers/dto/update-provider-dto";
import { GetProviderById } from "../../../application/providers/use-cases/get-provider-by-id.use-case";
import { GetProviderByName } from "../../../application/providers/use-cases/get-provider-by-name.use-case";
import { GetProviderByNit } from "../../../application/providers/use-cases/get-provider-by-nit.use-case";

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

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) return res.status(error.statusCode).json({ error: error.message });
        console.log(error); // Winston
        return res.status(500).json({ error: 'Internal Server Error' });
    }

    public createNewProvider = (req: Request, res: Response): void => {
        const registerDto = RegisterProviderDto.create(req.body);
        if (!registerDto.ok) {
            const error = registerDto.error as CustomError;
            res.status(error.statusCode).json({ message: error.message });
            return;
        };
        this.providerDependencies.createProviderUseCase
            .execute(registerDto.value)
            .then(data => res.status(201).json(data))
            .catch(error => this.handleError(error, res));
    }

    public getAllProviders = async (req: Request, res: Response): Promise<void> => {
        const providers = await this.providerDependencies.showAllProvidersUseCase.execute();
        res.status(200).json(providers);
    }

    public getProviderById = async (req: Request, res: Response): Promise<void> => {
        const provider = await this.providerDependencies.findProviderByIdUseCase.execute(req.params.id)
        res.status(200).json(provider)
    }

    public getProviderByNit = (req: Request, res: Response): void => {
        this.providerDependencies.findProviderByNitUseCase
            .execute(req.params.nit)
            .then(data => res.json(data))
            .catch(error => this.handleError(error, res));
    }

    public getProviderByName = (req: Request, res: Response): void => {
        this.providerDependencies.findProviderByNameUseCase
            .execute(req.params.name)
            .then(data => res.json(data))
            .catch(error => this.handleError(error, res));
    }

    public getProviderByTerm = (req: Request, res: Response): void => {
        this.providerDependencies.findProviderByTermUseCase
            .execute(req.params.term)
            .then(data => res.json(data))
            .catch(error => this.handleError(error, res))
    }

    public updatedProviderById = (req: Request, res: Response): void => {
        const responseDto = UpdateProviderDto.create(req.body);
        if (!responseDto.ok) {
            const error = responseDto.error as CustomError;
            res.status(error.statusCode).json({ message: error.message });
            return
        }
        this.providerDependencies.updateProviderByIdUseCase
            .execute(req.params.id, responseDto.value)
            .then(data => res.json(data))
            .catch(error => this.handleError(error, res))
    }

    public deleteProviderById = (req: Request, res: Response): void => {
        this.providerDependencies.deleteProviderByIdUseCase
            .execute(req.params.id)
            .then(data => {
                if (data) {
                    res.json({ message: 'Provider sucess inactivate' })
                } else {
                    res.json({ message: 'Provider fault inactivate' })
                }
            })
            .catch(error => this.handleError(error, res))
    }
}