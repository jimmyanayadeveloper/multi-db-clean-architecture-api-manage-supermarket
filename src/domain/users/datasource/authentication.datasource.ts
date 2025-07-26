import { LoginUserDto } from "../dto/login-user-dto";
import { RegisterUserDto } from "../dto/register-user-dto";
import { UserEntity } from "../entities/user.entity";


/* Define the way to get data for the authentication of datasource */
export interface AuthenticationDatasource {
    register(registerUserDto: RegisterUserDto): Promise<UserEntity>
    login(loginUserDto: LoginUserDto): Promise<UserEntity>
}