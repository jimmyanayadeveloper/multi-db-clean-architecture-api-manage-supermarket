import { Request, Response } from "express";
import { LoginUserDto, RegisterUserDto } from "../../domain/users";
import { CustomError } from "../../domain";
import { UserMongoseModel } from "../../infrastructure/datasources/mongo/models/user.model";
import { RegisterUser } from "../../application/user/use-cases/register-user.use-case";
import { LoginUser } from "../../application/user/use-cases/login-user.use-case";

interface AuthControllerDeps {
    registerUserUseCase: RegisterUser;
    loginUserUseCase: LoginUser;
}

export class AuthController {

    constructor(
        private readonly authDependencies: AuthControllerDeps
    ) { }

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) return res.status(error.statusCode).json({ error: error.message });
        console.log(error); // Winston
        return res.status(500).json({ error: 'Internal Server Error' });
    }

    public registerUser = (req: Request, res: Response): void => {
        const [error, registerUserDto] = RegisterUserDto.create(req.body);
        if (error) res.status(400).json({ error });
        this.authDependencies.registerUserUseCase
            .execute(registerUserDto!)
            .then(data => res.json(data))
            .catch(error => this.handleError(error, res))
    }

    public loginUser = (req: Request, res: Response): void => {
        const [error, loginUserDto] = LoginUserDto.login(req.body);
        if (error) res.status(400).json({ error });
        this.authDependencies.loginUserUseCase
            .execute(loginUserDto!)
            .then(data => res.json(data))
            .catch(error => this.handleError(error, res))
    }

    public getUser = (req: Request, res: Response) => {
        UserMongoseModel.find().then(users => {
            res.json({ user: req.body.user })
        }).catch(() => res.status(500).json({ error: 'Internal server error' }))
    }
}