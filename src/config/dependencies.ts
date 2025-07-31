import { AuthController } from "../presentation/auth/controllers";
import { ProviderController } from "../presentation/providers/controllers";

import { AuthenticationDatasourceImpl } from "../infrastructure/database/mongo/datasources/authentication.datasource.mongo";
import { AuthenticationRepositoryImpl } from "../infrastructure/repository/user/authentication.repository.impl";
import { ProviderDatasourceImp } from "../infrastructure/database/postgreSQL/datasources/provider.datasource.postgres";
import { ProviderRepositoryImpl } from "../infrastructure/repository/provider/provider.repository.imp";

import { CreateProvider } from "../application/providers/use-cases/add-provider.use-case";
import { LoginUser } from "../application/user/use-cases/login-user.use-case";
import { RegisterUser } from "../application/user/use-cases/register-user.use-case";
import { ShowAllProvider } from "../application/providers/use-cases/get-all-provider.use-case";
import { ProviderByTerm } from "../application/providers/use-cases/get-provider-term.use-case";


export function initDependencies() {

    /* Datasource */
    const authDatasource = new AuthenticationDatasourceImpl();
    const providerDatasource = new ProviderDatasourceImp();

    /* Repository with datasource */
    const authRepository = new AuthenticationRepositoryImpl(authDatasource);
    const providerRepository = new ProviderRepositoryImpl(providerDatasource);

    /* Instance use case */
    /* Authentication */
    const registerUserUseCase = new RegisterUser(authRepository)
    const loginUserUseCase = new LoginUser(authRepository);
    /* Providers */
    const createProviderUseCase = new CreateProvider(providerRepository);
    const findByTermUseCase = new ProviderByTerm(providerRepository);
    const showAllProvidersUseCase = new ShowAllProvider(providerRepository);


    /* Controller with use cases */
    /* Authentication */
    const authController = new AuthController({ registerUserUseCase, loginUserUseCase });
    /* Providers */
    const providerController = new ProviderController({ createProviderUseCase, showAllProvidersUseCase, findByTermUseCase });

    return {
        authController,
        providerController
    }

}
