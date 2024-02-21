import { PaginationResponse } from "@core/interfaces";
import { Criteria } from "@core/models";

import { EpisodeRepository, Episode } from "@anime";

export interface FindEpisodeUseCase{
    execute(filter?: Criteria<Object>): Promise<PaginationResponse<Episode[]>>
}

export class FindEpisode implements FindEpisodeUseCase{
    
    constructor(
            private readonly episodeRepository: EpisodeRepository
        ){}

    execute(filter?: Criteria<Object>): Promise<PaginationResponse<Episode[]>> {
        return this.episodeRepository.find(filter)
    }
}