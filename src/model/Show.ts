export class Show {
    constructor(
        private id: string,
        private week_day: WeekDay,
        private start_time: number,
        private end_time: number,
        private band_id: string
    ) { }

    public getId() {
        return this.id;
    }

    public getWeekDay() {
        return this.week_day
    }

    public getStartTime() {
        return this.start_time;
    }

    public getEndTime() {
        return this.end_time
    }

    public getBandId() {
        return this.band_id
    }

    static toBandModel(show: any): Show {
        return new Show(show.id, show.week_day, show.start_time, show.end_time, show.band_id);
    }
}

export interface AddShowInputDTO {
    week_day: WeekDay,
    start_time: number,
    end_time: number,
    band_id: string
}

export interface GetShows {
    id: string,
    week_day: WeekDay,
    start_time: number,
    end_time: number,
    band_id: string
}

export interface ResultShowsByDay {
    name: string,
    music_genre: string
}

export enum WeekDay {
    FRIDAY = "FRIDAY",
    SATURDAY = "SATURDAY",
    SUNDAY = "SUNDAY"
}