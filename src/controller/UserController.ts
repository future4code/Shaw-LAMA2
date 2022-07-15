import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { LoginInputDTO, UserInputDTO } from "../model/User";

export class UserController {

    constructor(
        private userBusiness = new UserBusiness
    ) { }

    signup = async(req: Request, res: Response) => {
        try {
            const { name, email, password, role } = req.body
            const user: UserInputDTO = {
                name,
                email,
                password,
                role
            }
            const token = await this.userBusiness.signUp(user)
            res.status(201).send({ message: "Usuário criado com sucesso!", token })
        } catch (error: any) {
            res.status(error.statusCode || 400).send({ message: error.message })
        }
    }

    login = async (req: Request, res: Response) => {
        // receber os dados do body 
        const { email, password } = req.body
        const userLogin: LoginInputDTO = { email, password }

        try {
            const result = await this.userBusiness.login(userLogin)
            res.status(200).send(result)
        } catch (error: any) {

            res.status(error.statusCode || 400).send({ message: error.message });

        }
    }

}