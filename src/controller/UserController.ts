import { Request, Response } from "express";
import { BaseDatabase } from "../data/BaseDatabase";

export class UserController {
    async signup(req: Request, res: Response) {
        try {


        } catch (error) {
            
        }

        await BaseDatabase.destroyConnection()
    }

    async login(req: Request, res: Response) {

        try {


        } catch (error) {

        }

        await BaseDatabase.destroyConnection()
    }

}