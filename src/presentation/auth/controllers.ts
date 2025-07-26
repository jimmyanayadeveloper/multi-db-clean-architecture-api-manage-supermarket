import { Request, Response } from "express";
import { RegisterUserDto } from "../../domain/users";
import { CustomError } from "../../domain";
import { UserMongoseModel } from "../../infrastructure/database/mongo/models/user.model";
import { RegisterUser } from "../../application/user/use-cases/register-user.use-case";
import { AuthenticationUserRepository } from "../../domain/users/repository/authentication.repository";


export class AuthController {

    constructor(
        private readonly authRepository: AuthenticationUserRepository
    ) { }

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) return res.status(error.statusCode).json({ error: error.message });
        console.log(error); // Winston
        return res.status(500).json({ error: 'Internal Server Error' });
    }

    public registerUser = (req: Request, res: Response): void => {
        const [error, registerUserDto] = RegisterUserDto.create(req.body);
        if (error) res.status(400).json({ error });
        new RegisterUser(this.authRepository)
            .execute(registerUserDto!)
            .then(data => res.json(data))
            .catch(error => this.handleError(error, res))
    }

    /* public loginUser = (req: Request, res: Response): void => {
        const [error, loginUserDto] = LoginUserDto.login(req.body);
        if (error) res.status(400).json({ error });
        new LoginUser(this.authRepository)
            .execute(loginUserDto!)
            .then(data => res.json(data))
            .catch(error => this.handleError(error, res))
    } */

    public getUser = (req: Request, res: Response) => {
        UserMongoseModel.find().then(users => {
            res.json({ user: req.body.user })
        }).catch(() => res.status(500).json({ error: 'Internal server error' }))
    }
}