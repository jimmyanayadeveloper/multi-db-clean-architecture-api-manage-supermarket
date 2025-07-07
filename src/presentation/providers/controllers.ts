import { Request, Response } from "express";
import { CreateProvider } from "../../application/providers/use-cases/add-provider.use-case";
import { DeleteProvider } from "../../application/providers/use-cases/delete-provider.use-case";
import { GetAllProvider } from "../../application/providers/use-cases/get-all-provider.use-case";
import { ProviderByTerm } from "../../application/providers/use-cases/get-provider-term.use-case";
import { UpdateProvider } from "../../application/providers/use-cases/update-provider.use-case";
import { InMemoriaProviderRepository } from "../../infrastructure/database/provider.repository.memory";

const repository = new InMemoriaProviderRepository();

export class ProviderController {

    private getAll = new GetAllProvider(repository);
    private create = new CreateProvider(repository);
    private update = new UpdateProvider(repository);
    private remove = new DeleteProvider(repository);
    private findByTem = new ProviderByTerm(repository);

    public getAllProviders = (req: Request, res: Response): void => {
        const providers = this.getAll.execute();
        res.json(providers);
    }

    public createNewProvider = (req: Request, res: Response): void => {
        const newProvider = this.create.execute(req.body)
        res.status(200).json(newProvider);
    }

    public getBillByTerm = (req: Request, res: Response): void => {
        const providerFounded = this.findByTem.execute(req.params.term);
        res.json(providerFounded);
    }

    public updatedProviderByTerm = (req: Request, res: Response): void => {
        const providerUpdate = this.update.execute(req.params.term, req.body);
        res.json(providerUpdate);
    }

    public deleteProviderByTerm = (req: Request, res: Response): void => {
        this.remove.execute(req.params.term);
        res.json("Proveedor eliminado")
    }

}