import { Request, Response } from "express";
import { AddBandInputDTO } from "../model/Band";
import { BandBusiness } from "./../business/BandBusiness";

export default class BandController {
    constructor(
        private bandBusiness = new BandBusiness()
    ){}

    addBand = async(req: Request, res: Response) => {
        const {name, music_genre, responsible} = req.body
        const token = req.headers.authorization as string

        const input: AddBandInputDTO = {
            name,
            music_genre,
            responsible
        }

        try {
            await this.bandBusiness.addBand(input, token)
            res.status(201).send("Banda Adicionada com sucesso")
        } catch (error: any) {
            res.status(error.statusCode || 400).send({ message: error.message });
        }
    }
}