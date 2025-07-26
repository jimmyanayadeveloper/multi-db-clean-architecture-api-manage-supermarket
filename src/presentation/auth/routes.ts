import { Router } from "express";
import { AuthController } from './controllers';
import { AuthMiddleware } from "./middlewares/auth.middlewares";
import { AuthenticationDatasourceImpl } from '../../infrastructure/database/mongo/datasources/authentication.datasource.mongo';
import { AuthenticationRepositoryImpl } from "../../infrastructure/database/repository/authentication.repository.impl";

export class AuthRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new AuthenticationDatasourceImpl();
        const authRepository = new AuthenticationRepositoryImpl(datasource);

        const authController = new AuthController(authRepository);
        /* router.post('/login', authController.loginUser); */
        router.post('/register', authController.registerUser);
        router.get('/', [AuthMiddleware.validateJWT], authController.getUser)
        return router
    }
}