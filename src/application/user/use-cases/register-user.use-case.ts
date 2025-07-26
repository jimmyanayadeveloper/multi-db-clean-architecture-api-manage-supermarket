import { JwtAdapter } from "../../../config";
import { CustomError } from "../../../domain";

import { RegisterUserDto } from "../../../domain/users";
import { UserToken } from "../../../domain/users/interfaces/usertoken";
import { AuthenticationUserRepository } from "../../../domain/users/repository/authentication.repository";
import { RegisterUserUseCase } from "../../../domain/users/use-cases/register-user.use-case";


type SignToken = (payload: object, duration?: string) => Promise<string | null>

/* Class with business logic to register a user and return user with access token*/
export class RegisterUser implements RegisterUserUseCase {

    constructor(
        private readonly authRepository: AuthenticationUserRepository,
        private readonly signToken: SignToken = JwtAdapter.generateToken
    ) { }

    async execute(dto: RegisterUserDto): Promise<UserToken> {
        const user = await this.authRepository.register(dto);
        const token = await this.signToken({ id: user.id }, '2h');
        if (!token) throw CustomError.internalServer("Error generating token");
        return {
            token,
            user
        }
    }
}