import { BcryptAdapter } from "../../config";
import { UserModel } from "../../data/mongodb";
import { CustomError, UserEntity } from "../../domain";
import { AuthDatasource } from "../../domain/datasources/auth.datasources";
import { RegisterUserDto } from "../../domain/users";
import { LoginUserDto } from "../../domain/users/dto/login-user-dto";
import { UserMapper } from "../mappers/user.mapper";

type HashFunction = (password: string) => string;
type CompareFunction = (password: string, hashed: string) => boolean;

export class AuthDatasourceImp implements AuthDatasource {

    constructor(
        private readonly hashPassword: HashFunction = BcryptAdapter.hash,
        private readonly comparePassword: CompareFunction = BcryptAdapter.compare
    ) { }

    async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        const { name, email, password } = registerUserDto;

        try {
            // 1. Verificar si el correo existe
            const emailUserExists = await UserModel.findOne({ email });
            if (emailUserExists) throw CustomError.badRequest('User already exists');
            // 2. Hash de contraseña
            const user = await UserModel.create({ name, email, password: this.hashPassword(password) });
            await user.save();
            // 3. Mapear la respuesta a nuestra entitdad
            return UserMapper.userEntityFromObject(user);
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalServer();
        }
    }


    async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
        const { email, password } = loginUserDto;

        try {
            const user = await UserModel.findOne({ email });
            if (!user) throw CustomError.notFound('Usuario no encontrado');
            const isMatch = this.comparePassword(password, user.password);
            if (!isMatch) throw CustomError.forbidden("Credenciales incorrectas")
            return UserMapper.userEntityFromObject(user);
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalServer();
        }



    }

}