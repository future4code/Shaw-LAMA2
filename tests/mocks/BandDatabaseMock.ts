import { Band } from "../../src/model/Band";
import { Band1, Band2 } from "./BandMock";

export class BandDatabateMock {

    public async addBand(input: Band): Promise<void> {
    }

   public async getBandByName(name: string): Promise<Band | undefined> {
        switch (name) {
            case "mock1" :
                return Band1
            case "mock2" :
                return Band2
            default :
                return undefined
        }
    }
    
    public async getDetails(input: string, token: string): Promise<Band | undefined>{
        switch (input) {
            case "id_mock1" || "mock1" :
                return Band1
            case "id_mock2" || "mock2" :
                return Band2
            default :
                return undefined
        }
    }

    public async getBandByResponsible(responsible: string): Promise<Band | undefined>{
        switch (responsible) {
            case "responsible_mock1" :
                return Band1
            case "responsible_mock2" :
                return Band2
            default :
                return undefined
        }
    }

    public async getBandById(id: string): Promise<Band | undefined>{
        switch (id) {
            case "id_mock1" :
                return Band1
            case "id_mock2" :
                return Band2
            default :
                return undefined
        }
    }
}