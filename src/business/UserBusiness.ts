import { UserDatabase } from "../data/UserDatabase";
import { BaseError } from "../error/BaseError";
import { UserInputDTO, LoginInputDTO, User, GetUserByEmail, UserRole } from "../model/User";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";

export class UserBusiness {

    constructor(
        private userDataBase = new UserDatabase,
        private idGenerator = new IdGenerator,
        private hashManager = new HashManager,
        private authenticator = new Authenticator
    ) { }

    async signUp(user: UserInputDTO) {
        const { name, email, password } = user
        let { role } = user
        try {
            if (!name || !email || !password) {
                throw new Error("Insira corretamente as informações de 'name', 'email' e 'senha'")
            }
            if (!email.includes("@")) {
                throw new Error("Verifique se o campo de e-mail foi passado corretamente")
            }
            if (password.length < 6) {
                throw new Error("A senha deve possuir no mínimo 6 caracteres")
            }
            if (!role) {
                role = "NORMAL"
            }
            if (role !== UserRole.NORMAL && role !== UserRole.ADMIN) {
                throw new Error("O role passado é invalido. Preencha com os valor de NORMAL ou ADMIN")
            }
            const registeredUser = await this.userDataBase.getUserByEmail(email)
            if (registeredUser) {
                throw new Error("E-mail já cadastrado!")
            }
            const id = this.idGenerator.generate()

            const hashedPassword = await this.hashManager.hash(password)
            const user = new User(
                id,
                name,
                email,
                hashedPassword,
                role
            )
            await this.userDataBase.createUser(user)
            const token = this.authenticator.generateToken({ id, role })
            return token

        } catch (error: any) {
            throw new BaseError(error.statusCode || 400, error.message)
        }
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