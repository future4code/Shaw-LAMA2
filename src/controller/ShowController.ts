import { Request, Response } from "express";
import { ShowBusiness } from "../business/ShowBusiness";
import { AddShowInputDTO } from "../model/Show";

export class ShowController {

    constructor(
        private showBusiness = new ShowBusiness
    ) { }

    insert = async (req: Request, res: Response) => {
        // receber dados do body
        const { week_day, start_time, end_time, band_id } = req.body

        // criar objeto 
        const show: AddShowInputDTO = {
            week_day, start_time, end_time, band_id
        }

        const token: string = req.headers.authorization as string

        try {

            const response = await this.showBusiness.insertShow(show, token)

            res.status(201).send(response)
        } catch (error: any) {
            res.status(error.statusCode || 400).send({ message: error.message })
        }
    }
    getShowsByData = async (req: Request, res: Response) => {
        try {
            const { day } = req.params
            const token: string = req.headers.authorization as string
            const show = await this.showBusiness.getShow(day, token)
            res.status(200).send(show)
        } catch (error: any) {
            res.status(error.statusCode || 400).send({ message: error.message })
        }
    }
}