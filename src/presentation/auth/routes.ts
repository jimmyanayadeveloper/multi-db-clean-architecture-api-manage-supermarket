import { Router } from "express";
import { AuthMiddleware } from "./middlewares/auth.middlewares";
import { Dependencies } from "../../config/dependencies";

export class AuthRoutes {
    static get routes(): Router {
        const router = Router();

        const { authController } = Dependencies;

        router.post('/login', authController.loginUser);
        router.post('/register', authController.registerUser);
        router.get('/', [AuthMiddleware.validateJWT], authController.getUser)
        return router
    }
}