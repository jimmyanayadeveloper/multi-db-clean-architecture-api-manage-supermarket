import { NextFunction, Request, RequestHandler, Response } from "express";
import { JwtAdapter } from "../../../config";
import { UserMongoseModel } from "../../../infrastructure/database/mongo/models/user.model";

export class AuthMiddleware {
    static validateJWT: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {

        const authorization = req.header('Authorization');
        if (!authorization) {
            res.status(401).json({ error: 'No token provided' });
            return
        }
        if (!authorization.startsWith('Bearer ')) {
            console.log('barer')
            res.status(401).json({ error: 'Invalid Bearer token' });
            return
        }
        const token = authorization.split(' ')[1] || '';
        console.log({ token })
        console.log('Paso por el middleware');

        try {
            const payload = await JwtAdapter.validateToken<{ id: string }>(token);
            console.log(payload)
            if (!payload) {
                res.status(401).json({ error: 'Invalid token - user not found' });
                return;
            }
            const user = await UserMongoseModel.findById(payload.id);
            if (!user) {
                res.status(401).json({ error: 'Invalid token - user not found' });
                return;
            }
            req.body.user = user
            next()
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Internal server' })
        }


    }
}