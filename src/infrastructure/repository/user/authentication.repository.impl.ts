import { UserEntity } from "../../../domain";
import { RegisterUserDto } from "../../../domain/users";
import { AuthenticationDatasource } from "../../../domain/users/datasource/authentication.datasource";
import { LoginUserDto } from "../../../domain/users/dto/login-user-dto";
import { AuthenticationUserRepository } from "../../../domain/users/repository/authentication.repository";

export class AuthenticationRepositoryImpl implements AuthenticationUserRepository {

    constructor(private readonly datasource: AuthenticationDatasource) { }

    register(dto: RegisterUserDto): Promise<UserEntity> {
        return this.datasource.register(dto);
    }
    login(dto: LoginUserDto): Promise<UserEntity> {
        return this.datasource.login(dto);
    }

}