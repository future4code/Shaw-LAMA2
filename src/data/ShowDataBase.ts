import { BaseError } from "../error/BaseError";
import { GetShows, Show } from "../model/Show";
import { BaseDatabase } from "./BaseDatabase";

export class ShowDataBase extends BaseDatabase {

    protected TABLE_NAME = "lama_shows"

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


}