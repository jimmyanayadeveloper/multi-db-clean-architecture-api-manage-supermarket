import { Router } from "express";
import { ProviderController } from './controllers';

export class ProvidersRoutes {
    static routes({ providerController }: { providerController: ProviderController }): Router {
        const router = Router();


        router.post('/create', providerController.createNewProvider);
        router.get('/show-all', providerController.getAllProviders);
        router.get('/find-by/:term', providerController.getBillByTerm);

        /* 
        
        router.put('/:term', providerController.updatedProviderByTerm);
        router.delete('/:term', providerController.deleteProviderByTerm); */
        return router;
    }
}