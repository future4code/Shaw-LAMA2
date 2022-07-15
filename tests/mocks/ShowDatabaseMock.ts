import { AddShowInputDTO, ResultShowsByDay, Show, WeekDay } from "../../src/model/Show";
import { show1, show2, showByDay1, showByDay2 } from "./ShowsMock";

export class ShowDataBaseMock {

    insertShow = async (show: AddShowInputDTO, token: string) => { }


    getShow = async (day: string, token: string): Promise<ResultShowsByDay[] | undefined> => {
        switch (day) {
            case WeekDay.FRIDAY:
                return [showByDay1]
            case WeekDay.SATURDAY:
                return [showByDay2]
            default:
                undefined
        }
    }

    public async getShowsByDay(day: string): Promise<ResultShowsByDay[] | undefined> {
        switch (day) {
            case WeekDay.FRIDAY:
                return [showByDay1]
            case WeekDay.SATURDAY:
                return [showByDay2]
            default:
                undefined
        }
    }
}

