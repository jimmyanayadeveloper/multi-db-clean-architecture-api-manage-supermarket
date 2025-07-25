import { RegisterUserDto } from "../users";
import { LoginUserDto } from "../users/dto/login-user-dto";
import { UserEntity } from "../users/entities/user.entity";

export abstract class AuthDatasource {

    abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>
    abstract login(loginUserDto: LoginUserDto): Promise<UserEntity>

}