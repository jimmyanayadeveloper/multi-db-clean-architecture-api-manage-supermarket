import { Router } from "express";
import { AuthMiddleware } from "./middlewares/auth.middlewares";
import { AuthController } from "./controllers";

export class AuthRoutes {
    static routes({ authController }: { authController: AuthController }): Router {
        const router = Router();

        router.post('/login', authController.loginUser);
        router.post('/register', authController.registerUser);
        router.get('/', [AuthMiddleware.validateJWT], authController.getUser)
        return router
    }
}