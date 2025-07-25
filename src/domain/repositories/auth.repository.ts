import { AuthDatasource } from "../datasources/auth.datasources";
import { RegisterUserDto } from "../users";
import { LoginUserDto } from "../users/dto/login-user-dto";
import { UserEntity } from "../users/entities/user.entity";

export abstract class AuthRepository implements AuthDatasource {
    abstract login(loginUserDto: LoginUserDto): Promise<UserEntity>
    abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>

}