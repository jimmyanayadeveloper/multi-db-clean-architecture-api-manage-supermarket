import { LoginUser } from "../application/user/use-cases/login-user.use-case";
import { RegisterUser } from "../application/user/use-cases/register-user.use-case";
import { AuthenticationDatasourceImpl } from "../infrastructure/database/mongo/datasources/authentication.datasource.mongo";
import { AuthenticationRepositoryImpl } from "../infrastructure/database/repository/authentication.repository.impl";
import { AuthController } from "../presentation/auth/controllers";


/* Datasource */
const authDatasource = new AuthenticationDatasourceImpl();

/* Repository with datasource */
const authRepository = new AuthenticationRepositoryImpl(authDatasource);

const registerUserUseCase = new RegisterUser(authRepository)
const loginUserUseCase = new LoginUser(authRepository);

/* Controller with use cases */
const authController = new AuthController({ registerUserUseCase, loginUserUseCase });



export const Dependencies = {
    authController
}