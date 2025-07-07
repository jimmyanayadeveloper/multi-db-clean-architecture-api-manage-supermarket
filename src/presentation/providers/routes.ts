import { Router } from "express";
import { ProviderController } from "./controllers";

export class ProvidersRoutes {
    static get routes(): Router {
        const router = Router();
        const providerController = new ProviderController();
        router.get('/', providerController.getAllProviders);
        router.post('/', providerController.createNewProvider);
        router.put('/:term', providerController.updatedProviderByTerm);
        router.delete('/:term', providerController.deleteProviderByTerm);
        return router;
    }
}