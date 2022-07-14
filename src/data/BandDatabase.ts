import { BaseError } from "../error/BaseError";
import { Band } from "./../model/Band";
import { BaseDatabase } from "./BaseDatabase";

export class BandDatabate extends BaseDatabase {
    protected TABLE_NAME = "lama_bands"

    public async addBand(input: Band) {
        try {
            await this.getConnection()
            .insert(input)
            .into(this.TABLE_NAME)
        } catch (error: any) {
            throw new BaseError(500, error.sqlmessage || "Internal error.");
        }
    }

    public async getBandByName(name: string){
        try {
            const response: Band[] = await this.getConnection()
            .select()
            .from(this.TABLE_NAME)
            .where({name})
            return response
        } catch (error: any) {
            throw new BaseError(500, error.sqlmessage || "Internal error.");
        }
    }
    public async getBandByResponsible(responsible: string){
        try {
            const response: Band[] = await this.getConnection()
            .select()
            .from(this.TABLE_NAME)
            .where({responsible})
            return response
        } catch (error: any) {
            throw new BaseError(500, error.sqlmessage || "Internal error.");
        }
    }
}