import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { LoginInputDTO } from "../model/User";

export class UserController {

    constructor(
        private userBusiness = new UserBusiness
    ) { }

    async signup(req: Request, res: Response) {
        try {


        } catch (error) {

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