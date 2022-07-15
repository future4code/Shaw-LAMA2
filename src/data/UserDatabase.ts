import { BaseError } from "../error/BaseError";
import { GetUserByEmail, User } from "../model/User";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {

  protected TABLE_NAME = "lama_users";

  public async createUser(user: User) {
    try {
      await this.getConnection()
        .insert(user)
        .into(this.TABLE_NAME)
    } catch (error: any) {
      throw new BaseError(500, error.sqlMessage || "Internal error.")
    }
  }

  public async getUserByEmail(email: string) {
    try {
      const response: GetUserByEmail[] = await this.getConnection()
        .select()
        .from(this.TABLE_NAME)
        .where({ email: email })

      return response[0]

    } catch (error: any) {
      throw new BaseError(500, error.sqlMessage || "Internal error.");
    }
  }

}
