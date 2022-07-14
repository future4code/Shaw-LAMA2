export class Band {
    constructor(
        private id: string,
        private name: string,
        private music_genre: string,
        private responsible: string
    ) { }

    public getId() {
        return this.id;
    }

    public getName() {
        return this.name
    }

    public getMusic_genre() {
        return this.music_genre;
    }

    public getResponsible() {
        return this.responsible
    }

    static toBandModel(band: any): Band {
        return new Band(band.id, band.name, band.music_genre, band.responsible);
    }
}

export interface AddBandInputDTO {
    name: string,
    music_genre: string,
    responsible: string
}

export interface GetBand {
    id: string,
    name: string,
    music_genre: string,
    responsible: string
}