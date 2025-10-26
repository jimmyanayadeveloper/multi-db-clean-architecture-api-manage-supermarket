import { Router } from "express";
import { ProviderController } from '../../infrastructure/provider/controllers/controllers';
import { asyncHandler } from "../middlewares/async-handler.middleware";

export class ProvidersRoutes {
    static routes({ providerController }: { providerController: ProviderController }): Router {

        const router = Router();
        router.post('/create', providerController.createNewProvider);
        router.get('/show-all', asyncHandler(providerController.getAllProviders));
        router.get('/find-by-id/:id', providerController.getProviderById);
        router.get('/find-by-name/:name', providerController.getProviderByName);
        router.get('/find-by-nit/:nit', providerController.getProviderByNit);
        router.get('/find-by-term/:term', providerController.getProviderByTerm);
        router.put('/update/:id', providerController.updatedProviderById);
        router.delete('/inactivate/:id', providerController.deleteProviderById);
        return router;
    }
}