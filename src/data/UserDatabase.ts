import { BaseError } from "../error/BaseError";
import { GetUserByEmail, User } from "../model/User";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {

  protected TABLE_NAME = "lama_users";

  public async createUser() {
    try {

    } catch (error) {

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
      throw new BaseError(500, error.sqlmessage || "Internal error.");
    }
  }

}
