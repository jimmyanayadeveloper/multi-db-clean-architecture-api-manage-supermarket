import { Request, Response } from "express";
import { RegisterUserDto } from "../../domain/users";
import { AuthRepository } from "../../domain/repositories/auth.repository";
import { CustomError, RegisterUser } from "../../domain";
import { JwtAdapter } from "../../config";
import { UserModel } from "../../data/mongodb";
import { LoginUserDto } from '../../domain/users/dto/login-user-dto';
import { LoginUser } from "../../domain/uses-cases/auth/login-user.use-case";


export class AuthController {

    constructor(
        private readonly authRepository: AuthRepository
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

    public loginUser = (req: Request, res: Response): void => {
        const [error, loginUserDto] = LoginUserDto.login(req.body);
        if (error) res.status(400).json({ error });
        new LoginUser(this.authRepository)
            .execute(loginUserDto!)
            .then(data => res.json(data))
            .catch(error => this.handleError(error, res))
    }

    public getUser = (req: Request, res: Response) => {
        UserModel.find().then(users => {
            res.json({ user: req.body.user })
        }).catch(() => res.status(500).json({ error: 'Internal server error' }))
    }
}