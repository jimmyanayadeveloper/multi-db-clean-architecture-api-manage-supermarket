import { RegisterUserDto } from "../../../domain/users";
import { UserToken } from "../interfaces/usertoken";

export interface RegisterUserUseCase {
    execute(dto: RegisterUserDto): Promise<UserToken>
}

/* 
import { LoginUserDto } from "../../users/dto/login-user-dto";
import { AuthRepository } from '../../repositories/auth.repository';
import { JwtAdapter } from "../../../config";
import { CustomError } from "../../errors/custom.error";

interface UserToken {
    token: string;
    user: {
        id: string;
        name: string;
        email: string;
    }
}

type SignToken = (payload: object, duration?: string) => Promise<string | null>

interface LoginUserUseCase {
    execute(loginUserDto: LoginUserDto): Promise<UserToken>
}

export class LoginUser implements LoginUserUseCase {

    constructor(private readonly authRepository: AuthRepository,
        private readonly signToken: SignToken = JwtAdapter.generateToken
    ) { }

    async execute(loginUserDto: LoginUserDto): Promise<UserToken> {
        const user = await this.authRepository.login(loginUserDto);
        const token = await this.signToken({ id: user.id }, '2h');
        if (!token) throw CustomError.internalServer("Error generating token");
        return {
            token,
            user
        }
    }
} */