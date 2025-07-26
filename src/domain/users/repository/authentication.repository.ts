import { LoginUserDto } from "../dto/login-user-dto";
import { RegisterUserDto } from "../dto/register-user-dto";
import { UserEntity } from "../entities/user.entity";

/* Define the actions of the business logic */
export interface AuthenticationUserRepository {
    register(data: RegisterUserDto): Promise<UserEntity>
    login(data: LoginUserDto): Promise<UserEntity>
}