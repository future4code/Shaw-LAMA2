import { BandDatabateMock } from "./mocks/BandDatabaseMock";
import { BandBusiness } from "../src/business/BandBusiness";
import { IdGeneratorMock } from "./mocks/IdGeneratorMock";
import { AuthenticatorMock } from "./mocks/AuthenticatorMock";
import { Band2 } from "./mocks/BandMock";
import { ShowBusiness } from "../src/business/ShowBusiness";
import { ShowDataBaseMock } from "./mocks/ShowDatabaseMock";
import { showByDay2 } from "./mocks/ShowsMock";


const bandBusinessMock = new BandBusiness(
    new BandDatabateMock as any,
    new IdGeneratorMock,
    new AuthenticatorMock
)

const showBusinessMock = new ShowBusiness(
    new BandDatabateMock as any,
    new ShowDataBaseMock as any,
    new IdGeneratorMock,
    new AuthenticatorMock
)


describe("Band table tests", () => {
    test("Test getBandByName, empty paramater", async () => {
        try {
            await bandBusinessMock.getDetails("", "TOKEN")
        } catch (error: any) {
            expect(error.message).toBe("Banda não encontrada")
        }
    })
    test("Success test", async () => {
        try {
            const getDetails = jest.fn((input: string, token: string) => bandBusinessMock.getDetails(input, token))
            const result = await getDetails("id_mock2", "TOKEN")
            expect(result).toBe(Band2)
            expect(getDetails).toHaveBeenCalledWith("id_mock2", "TOKEN")
        } catch (error: any) {
            console.log(error)
        } finally {
            expect.assertions(2)
        }
    })
})

describe("Shows table tests", () => {
    test("Test getShowByDay, empty day paramater", async () => {
        expect.assertions(1)
        try {
            await showBusinessMock.getShow("", "TOKEN")
        } catch (error: any) {
            expect(error.message).toBe("Insira um dia de show")
        }
    })
    test("Success test shows", async () => {
        try {
            const getShow = jest.fn((day: string, token: string) => showBusinessMock.getShow(day, token))

            const result2 = await getShow("SATURDAY", "TOKEN")

            expect(result2).toStrictEqual([showByDay2])
            expect(getShow).toHaveBeenCalledWith("SATURDAY", "TOKEN")
        } catch (error: any) {
            console.log(error)
        } finally {
            expect.assertions(2)
        }
    })
}) 