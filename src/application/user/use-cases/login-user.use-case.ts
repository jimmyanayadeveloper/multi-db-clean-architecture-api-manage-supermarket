import { JwtAdapter } from "../../../config";
import { AuthenticationUserRepository, CustomError, LoginUserDto, UserToken } from "../../../domain";
import { LoginUserUseCase } from "../../../domain/users/use-cases/login-user.use.case";

type SignToken = (payload: object, duration?: string) => Promise<string | null>

export class LoginUser implements LoginUserUseCase {

    constructor(
        private readonly authRepository: AuthenticationUserRepository,
        private readonly signToken: SignToken = JwtAdapter.generateToken
    ) { }

    async execute(dto: LoginUserDto): Promise<UserToken> {
        const user = await this.authRepository.login(dto);
        const token = await this.signToken({ id: user.id }, '2h');
        if (!token) throw CustomError.internalServer("Error generating token");
        return {
            token, user
        }
    }
}
