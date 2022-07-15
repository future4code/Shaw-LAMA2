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
                throw new BaseError(401, "Unauthorized.");
            }
            const validToken = this.authenticator.getData(token)
            if (!validToken) {
                throw new BaseError(404, "Invalid token.")
            }

            let { week_day, start_time, end_time, band_id } = show

            if (!week_day || !start_time || !end_time || !band_id) {
                throw new BaseError(422, "Missing body input.");
            }
            if (week_day.toUpperCase() !== WeekDay.FRIDAY && week_day.toUpperCase() !== WeekDay.SATURDAY && week_day.toUpperCase() !== WeekDay.SUNDAY) {
                throw new BaseError(
                    422, "The day to occur the show must be one of this: 'FRIDAY', 'SATURDAY' or 'SUNDAY'."
                );
            }
            if (typeof start_time !== "number" || typeof end_time !== "number") {
                throw new BaseError(422, "Start_time and end_time must to be only integer numbers.");
            }
            if (!Number.isInteger(start_time) || !Number.isInteger(end_time)) {
                throw new BaseError(422, "Start_time and end_time must to be only integer numbers.");
            }
            if (start_time < 8 || start_time > 22) {
                throw new BaseError(422, "Invalid start_time, it must be between '8' and '22'.");
            }
            if (end_time > 23 || end_time < 9) {
                throw new BaseError(422, "Invalid end_time, it must be between '9' and '23'.");
            }
            if (end_time <= start_time) {
                throw new BaseError(422, "A show cannot occur in the past or as it start it's finished.");
            }
            // verificar se existe a banda 
            const verifyBand: GetBand = await this.bandDataBase.getBandById(band_id)
            if (!verifyBand) {
                throw new BaseError(404, "Band not found.");
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
                throw new BaseError(422, "There is a show already happening at this day and time.");
            }

            // gerar id 
            const id: string = this.idGenerator.generate()

            const newShow: Show = new Show(
                id, week_day, start_time, end_time, band_id
            )

            await this.showDataBase.insertShow(newShow)

            return {
                ...newShow, message: "Show successfully created."
            }

        } catch (error: any) {
            throw new BaseError(error.statusCode || 400, error.message)
        }
    }
}
