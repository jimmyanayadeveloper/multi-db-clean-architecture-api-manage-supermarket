import { LoginUserDto } from "../dto/login-user-dto";
import { UserToken } from "../interfaces/usertoken";

export interface LoginUserUseCase {
    execute(dto: LoginUserDto): Promise<UserToken>
}