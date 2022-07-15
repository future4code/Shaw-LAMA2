import { Show, WeekDay } from "../../src/model/Show";

export const show1 = new Show(
    "id_mock1",
    WeekDay.FRIDAY,
    8,
    10,
    "band_id_mock1"
)
export const show2 = new Show(
    "id_mock2",
    WeekDay.SATURDAY,
    10,
    12,
    "band_id_mock2"
)

export const showByDay1 = { name: "mock1", music_genre: "genre_mock1" }
export const showByDay2 = { name: "mock2", music_genre: "genre_mock2" }
