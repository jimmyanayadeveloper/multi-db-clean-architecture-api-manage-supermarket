import { AuthenticationDatasource, AuthenticationUserRepository, RegisterUserDto } from "../../../domain/users";
import { LoginUserDto } from "../../../domain/users/dto/login-user-dto";
import { UserEntity } from "../../../domain";

export class AuthRepositoryImp implements AuthenticationUserRepository {
    constructor(private readonly authDatasource: AuthenticationDatasource) { }
    login(loginUserDto: LoginUserDto): Promise<UserEntity> {
        return this.authDatasource.login(loginUserDto);
    }
    register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        return this.authDatasource.register(registerUserDto);
    }
}