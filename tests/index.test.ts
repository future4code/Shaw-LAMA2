import { BandDatabateMock } from "./mocks/BandDatabaseMock";
import { BandBusiness } from "../src/business/BandBusiness";
import { IdGeneratorMock } from "./mocks/IdGeneratorMock";
import { AuthenticatorMock } from "./mocks/AuthenticatorMock";
import { Band2 } from "./mocks/BandMock";

const bandBusinessMock = new BandBusiness(
    new BandDatabateMock as any,
    new IdGeneratorMock,
    new AuthenticatorMock
)

describe ("Band table tests", () => {
    test("Test getBandByName, empty paramater", async() => {
        try {
            await bandBusinessMock.getDetails("", "TOKEN")
        } catch (error: any) {
            expect(error.message).toBe("Banda não encontrada")
        }
    })
    test("Success test", async() => {
        try {
            const getDetails = jest.fn((input: string, token: string) => bandBusinessMock.getDetails(input, token))
            const result = await getDetails("id_mock2", "TOKEN")
            expect(result).toBe(Band2)
            expect(getDetails).toHaveBeenCalledWith("id_mock2")
        } catch (error: any) {
            console.log(error)
        }finally{
            expect.assertions(2)
        }
    })
}) 