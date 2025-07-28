
import { RegisterUserDto } from "../dto/register-user-dto";
import { UserToken } from "../interfaces/usertoken";

export interface RegisterUserUseCase {
    execute(dto: RegisterUserDto): Promise<UserToken>
}
