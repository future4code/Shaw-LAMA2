import { BaseError } from "../error/BaseError";
import { GetShows, Show } from "../model/Show";
import { BaseDatabase } from "./BaseDatabase";

export class ShowDataBase extends BaseDatabase {

    protected TABLE_NAME = "lama_shows"
    protected TABLE_NAME2 = 'lama_bands'

    public async insertShow(input: Show) {
        try {

            await this.getConnection()
                .insert(input)
                .into(this.TABLE_NAME)

        } catch (error: any) {
            throw new BaseError(500, error.sqlmessage || "Internal error.");
        }
    }

    public async getShows(): Promise<GetShows[]> {
        try {
            const result: GetShows[] = await this.getConnection()
                .select()
                .from(this.TABLE_NAME)
            return result
        } catch (error: any) {
            throw new BaseError(500, error.sqlmessage || "Internal error.");
        }
    }

    public async getShowsByDay(day: string) {
        const result = await this.getConnection()
            .select("lama_bands.name", "lama_bands.music_genre")
            .from(this.TABLE_NAME).where({ week_day: day })
            .orderBy("start_time")
            .join(this.TABLE_NAME2, "lama_shows.band_id", "lama_bands.id")
        console.log(result)
        return result
    }
}