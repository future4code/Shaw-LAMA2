import { Request, Response } from "express";
import { BaseError } from "../error/BaseError";
import { AddBandInputDTO, Band } from "../model/Band";
import { BandBusiness } from "./../business/BandBusiness";

export default class BandController {
    constructor(
        private bandBusiness = new BandBusiness()
    ) { }

    addBand = async (req: Request, res: Response) => {
        const { name, music_genre, responsible } = req.body
        const token = req.headers.authorization as string

        const input: AddBandInputDTO = {
            name,
            music_genre,
            responsible
        }

        try {
            await this.bandBusiness.addBand(input, token)
            res.status(201).send({message:"Banda Adicionada com sucesso"})
        } catch (error: any) {
            res.status(error.statusCode || 400).send({ message: error.message });
        }
    }

    getDetails = async (req: Request, res: Response) => {
        const token = req.headers.authorization as string
        let input = req.body
        try {
            if (req.body.id) {
                input = req.body.id
            }
            if (req.body.name) {
                input = req.body.name
            }
            if (!req.body.name && !req.body.id) {
                throw new BaseError(422, "Body precisa ser name ou id")
            }
            const response: Band = await this.bandBusiness.getDetails(input, token)
            res.status(200).send(response)
        } catch (error: any) {
            res.status(error.statusCode || 400).send({ message: error.message });
        }
    }
}