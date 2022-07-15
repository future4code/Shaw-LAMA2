import { Authenticator } from "./../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";
import { BandDatabate } from "./../data/BandDatabase";
import { AddBandInputDTO, Band } from "../model/Band";
import { BaseError } from "../error/BaseError";

export class BandBusiness {
    constructor(
        private bandDatabate = new BandDatabate(),
        private idGenerator = new IdGenerator(),
        private authenticator = new Authenticator()
    ){}

    async addBand(input: AddBandInputDTO, token: string) {
        const{name, music_genre, responsible} = input

        if(!name || !music_genre || !responsible) {
            throw new BaseError(422, "Preencha todos os campos")
        }

        const validToken = this.authenticator.getData(token)
        if(!validToken) {
            throw new BaseError(404, "Token inválido, verificar login")
        }
        if(validToken.role !== "ADMIN") {
            throw new BaseError(401, "Usuário não autorizado")
        }

        const bandName = await this.bandDatabate.getDetails(name)

        if(bandName){
            throw new BaseError(409, "Nome de banda já cadastrada")
        }

        const bandResponsible = await this.bandDatabate.getBandByResponsible(responsible)

        if(bandResponsible.length > 0){
            throw new BaseError(409, "Responsável já cadastrado em outra banda")
        }

        const id = this.idGenerator.generate()

        const newBand = new Band(
            id,
            name,
            music_genre,
            responsible
        )

        await this.bandDatabate.addBand(newBand)

        return newBand
    }

    async getDetails(input: string,  token: string) {
        const validToken = this.authenticator.getData(token)

        if(!validToken){
            throw new BaseError(404, "Token inválido, verificar login")
        }

        const bandName = await this.bandDatabate.getDetails(input)
        if(!bandName) {
            throw new BaseError(404, "Banda não encontrada")
        }
        return bandName

    }
}