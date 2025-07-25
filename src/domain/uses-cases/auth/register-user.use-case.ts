import { JwtAdapter } from "../../../config";
import { CustomError } from "../../errors/custom.error";
import { AuthRepository } from "../../repositories/auth.repository";
import { RegisterUserDto } from "../../users";


interface UserToken {
    token: string;
    user: {
        id: string;
        name: string;
        email: string;
    }
}

type SignToken = (payload: object, duration?: string) => Promise<string | null>

interface RegisterUserUseCase {
    execute(registerUserDto: RegisterUserDto,): Promise<UserToken>;
}

export class RegisterUser implements RegisterUserUseCase {

    constructor(private readonly authRepository: AuthRepository,
        private readonly signToken: SignToken = JwtAdapter.generateToken
    ) { }

    async execute(registerUserDto: RegisterUserDto): Promise<UserToken> {
        /* Create user */
        const user = await this.authRepository.register(registerUserDto);
        /* Token */
        const token = await this.signToken({ id: user.id }, '2h');
        if (!token) throw CustomError.internalServer("Error generating token");
        return {
            token,
            user
        }
    }

}