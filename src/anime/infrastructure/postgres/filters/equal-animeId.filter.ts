import { Criteria } from "../../../../core/models";


export class EqualAnimeId implements Criteria<{ animeId: { equals: string } }>{

    constructor(
        private readonly animeId: string
    ){}

    applyFilter() {
        return{ animeId: { equals: this.animeId } };
    }
    
}