import { BandDatabate } from "../data/BandDatabase";
import { ShowDataBase } from "../data/ShowDataBase";
import { BaseError } from "../error/BaseError";
import { GetBand } from "../model/Band";
import { AddShowInputDTO, GetShows, Show, WeekDay } from "../model/Show";
import { AuthenticationData, Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export class ShowBusiness {

    constructor(
        private bandDataBase = new BandDatabate,
        private showDataBase = new ShowDataBase,
        private idGenerator = new IdGenerator,
        private authenticator = new Authenticator
    ) { }

    insertShow = async (show: AddShowInputDTO, token: string) => {
        try {
            // verificar authorization 
            const tokenData: AuthenticationData = this.authenticator.getData(token)
            if (tokenData.role !== "ADMIN") {
                throw new BaseError(401, "Não autorizado");
            }
            const validToken = this.authenticator.getData(token)
            if (!validToken) {
                throw new BaseError(404, "Token inválido.")
            }

            let { week_day, start_time, end_time, band_id } = show

            if (!week_day || !start_time || !end_time || !band_id) {
                throw new BaseError(422, "Preencha todos os campos.");
            }
            if (week_day.toUpperCase() !== WeekDay.FRIDAY && week_day.toUpperCase() !== WeekDay.SATURDAY && week_day.toUpperCase() !== WeekDay.SUNDAY) {
                throw new BaseError(
                    422, "Os shows devem acontecer nos seguintes dias: 'FRIDAY', 'SATURDAY' ou 'SUNDAY'."
                );
            }
            if (typeof start_time !== "number" || typeof end_time !== "number") {
                throw new BaseError(422, "Start_time e end_time devem ser números inteiros.");
            }
            if (!Number.isInteger(start_time) || !Number.isInteger(end_time)) {
                throw new BaseError(422, "Start_time e end_time devem ser números inteiros.");
            }
            if (start_time < 8 || start_time > 22) {
                throw new BaseError(422, "start_time inválido, deve ser entre '8' e '22'.");
            }
            if (end_time > 23 || end_time < 9) {
                throw new BaseError(422, "end_time inválido, deve ser entre '9' e '23'.");
            }
            if (end_time <= start_time) {
                throw new BaseError(422, "Um show não pode começar no passado.");
            }
            // verificar se existe a banda 
            const verifyBand: GetBand = await this.bandDataBase.getBandById(band_id)
            if (!verifyBand) {
                throw new BaseError(404, "Banda não encontrada.");
            }

            // verificar se já existe show marcado 
            const shows: GetShows[] = await this.showDataBase.getShows()
            const sameDateShows: GetShows[] = []
            // logica louca dos horarios 
            for (let show of shows) {
                if ((show.start_time === start_time && week_day === show.week_day)
                    ||
                    (show.start_time > start_time && week_day === show.week_day && show.start_time < end_time)
                    ||
                    (show.start_time < start_time && week_day === show.week_day && show.start_time > end_time)
                ) {
                    sameDateShows.push(show)
                }
            }

            if (sameDateShows.length !== 0) {
                throw new BaseError(422, "Já existe um show acontecendo nesse dia e horário.");
            }

            // gerar id 
            const id: string = this.idGenerator.generate()

            const newShow: Show = new Show(
                id, week_day, start_time, end_time, band_id
            )

            await this.showDataBase.insertShow(newShow)

            return {
                ...newShow, message: "Show criado com sucesso."
            }

        } catch (error: any) {
            throw new BaseError(error.statusCode || 400, error.message)
        }
    }
    getShow = async (day: string, token: string) => {
        if (!day || day.toUpperCase() !== WeekDay.FRIDAY && day.toUpperCase() !== WeekDay.SATURDAY && day.toUpperCase() !== WeekDay.SUNDAY) {
            throw new Error("Insira um dia de show, podendo ser: FRIDAY, SATURDAY ou SUNDAY")
        }
        const tokenData: AuthenticationData = this.authenticator.getData(token)
        if (tokenData.role !== "ADMIN") {
            throw new BaseError(401, "Não autorizado.");
        }
        const showDatabase = await this.showDataBase.getShowsByDay(day)
        if (showDatabase.length === 0) {
            throw new Error("Não existe show neste dia")
        }
        return showDatabase
    }
}