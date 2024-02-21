import { PaginationResponse } from "@core/interfaces/pagination-response";
import { Criteria } from "@core/models";

import { AnimeRepository, Anime } from "@anime";

export interface FindAnimeUseCase{
    execute(filter?: Criteria<Object>): Promise<PaginationResponse<Anime[]>>
}

export class FindAnime implements FindAnimeUseCase{
    
    constructor(
            private readonly animeRepository: AnimeRepository
        ){}

    execute(filter?: Criteria<Object>): Promise<PaginationResponse<Anime[]>> {
        return this.animeRepository.find(filter)
    }
}