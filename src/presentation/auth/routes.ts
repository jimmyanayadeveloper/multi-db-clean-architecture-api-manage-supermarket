import { Router } from "express";
import { AuthController } from './controllers';
import { AuthDatasourceImp, AuthRepositoryImp } from "../../infrastructure";
import { UserModel } from "../../data/mongodb";
import { AuthMiddleware } from "./middlewares/auth.middlewares";

export class AuthRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new AuthDatasourceImp();
        const authRepository = new AuthRepositoryImp(datasource);

        const authController = new AuthController(authRepository);
        router.post('/login', authController.loginUser);
        router.post('/register', authController.registerUser);
        router.get('/', [AuthMiddleware.validateJWT], authController.getUser)
        return router
    }
}