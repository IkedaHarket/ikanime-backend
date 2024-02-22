import { Criteria } from "../../../../core/models";


export class EqualAnimeEpisodeId implements Criteria<{ animeEpisodeId: { equals: string } }>{

    constructor(
        private readonly animeEpisodeId: string
    ){}

    applyFilter() {
        return{ animeEpisodeId: { equals: this.animeEpisodeId } };
    }
    
}