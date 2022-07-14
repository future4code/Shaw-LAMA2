import { UserDatabase } from "../data/UserDatabase";
import { BaseError } from "../error/BaseError";
import { UserInputDTO, LoginInputDTO, User, GetUserByEmail } from "../model/User";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";

export class UserBusiness {

    constructor(
        private userDataBase = new UserDatabase,
        private hashManager = new HashManager,
        private authenticator = new Authenticator
    ) { }

    async signUp(user: UserInputDTO) {

    }

    async login(userLogin: LoginInputDTO) {
        const { email, password } = userLogin
        try {
            // testar parametros recebidos 
            if (!email || !password) {
                throw new BaseError(422, "Missing input");
            }

            // verificar se existe user no bd 
            const user: GetUserByEmail | undefined = await this.userDataBase.getUserByEmail(email)
            console.log(user)
            if (!user) {
                throw new BaseError(404, "Invalid email.");
            }

            // verificar password 
            const verifyPassword: boolean = await this.hashManager.compare(password, user.password)
            // if (!verifyPassword) {
            //     throw new BaseError(404, "Invalid password.");
            // }

            // gerar token 
            const token: string = this.authenticator.generateToken({ id: user.id, role: user.role })

            // retorno da função
            return { token: token }

        } catch (error: any) {
            throw new BaseError(error.statusCode || 400, error.message);
        }
    }
}