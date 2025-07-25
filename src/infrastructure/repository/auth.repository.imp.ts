import { UserEntity } from "../../domain";
import { AuthDatasource } from "../../domain/datasources/auth.datasources";
import { AuthRepository } from "../../domain/repositories/auth.repository";
import { RegisterUserDto } from "../../domain/users";
import { LoginUserDto } from "../../domain/users/dto/login-user-dto";

export class AuthRepositoryImp implements AuthRepository {
    constructor(private readonly authDatasource: AuthDatasource) { }
    login(loginUserDto: LoginUserDto): Promise<UserEntity> {
        return this.authDatasource.login(loginUserDto);
    }
    register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        return this.authDatasource.register(registerUserDto);
    }
}