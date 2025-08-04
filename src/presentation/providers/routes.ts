import { Router } from "express";
import { ProviderController } from './controllers';

export class ProvidersRoutes {
    static routes({ providerController }: { providerController: ProviderController }): Router {

        const router = Router();
        router.post('/create', providerController.createNewProvider);
        router.get('/show-all', providerController.getAllProviders);
        router.get('/find-by/:term', providerController.getBillByTerm);
        router.put('/update/:id', providerController.updatedProviderById);
        router.delete('/delete/:id', providerController.deleteProviderById);
        return router;
    }
}