import { Request, Response } from "express";
import { CreateProvider } from "../../application/providers/use-cases/add-provider.use-case";
import { DeleteProvider } from "../../application/providers/use-cases/delete-provider.use-case";
import { ShowAllProvider } from '../../application/providers/use-cases/get-all-provider.use-case';
import { ProviderByTerm } from "../../application/providers/use-cases/get-provider-term.use-case";
import { UpdateProvider } from "../../application/providers/use-cases/update-provider.use-case";
import { CreateProviderDto } from "../../domain/providers";
import { CustomError } from "../../domain";
import { rmSync } from "fs";
/* import { InMemoriaProviderRepository } from "../../infrastructure/database/provider.repository.memory"; */

/* const repository = new InMemoriaProviderRepository(); */

interface ProviderControllerDeps {
    createProviderUseCase: CreateProvider;
    showAllProvidersUseCase: ShowAllProvider;
    findByTermUseCase: ProviderByTerm
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

    /* private getAll = new GetAllProvider(repository);
    private create = new CreateProvider(repository);
    private update = new UpdateProvider(repository);
    private remove = new DeleteProvider(repository);
    private findByTem = new ProviderByTerm(repository); */

    /*  
     } */

    public createNewProvider = (req: Request, res: Response): void => {
        const [error, provider] = CreateProviderDto.create(req.body);
        if (error) res.status(400).json({ error });
        this.providerDependencies.createProviderUseCase
            .execute(provider!)
            .then(data => res.json(data))
            .catch(error => this.handleError(error, res));
    }

    public getAllProviders = (req: Request, res: Response): void => {
        this.providerDependencies.showAllProvidersUseCase
            .execute()
            .then(data => res.json(data))
            .catch(error => this.handleError(error, res));
    }

    public getBillByTerm = (req: Request, res: Response): void => {
        console.log(req.params.term)
        this.providerDependencies.findByTermUseCase
            .execute(req.params.term)
            .then(data => res.json(data))
            .catch(error => this.handleError(error, res))
    }

    /* public updatedProviderByTerm = (req: Request, res: Response): void => {
        const providerUpdate = this.update.execute(req.params.term, req.body);
        res.json(providerUpdate);
    } */

    /* public deleteProviderByTerm = (req: Request, res: Response): void => {
        this.remove.execute(req.params.term);
        res.json("Proveedor eliminado")
    } */

}