import { AuthenticationDatasource, AuthenticationUserRepository, LoginUserDto, RegisterUserDto, UserEntity } from "../../../domain";

export class AuthenticationRepositoryImpl implements AuthenticationUserRepository {

    constructor(private readonly datasource: AuthenticationDatasource) { }

    register(dto: RegisterUserDto): Promise<UserEntity> {
        return this.datasource.register(dto);
    }
    login(dto: LoginUserDto): Promise<UserEntity> {
        return this.datasource.login(dto);
    }

}