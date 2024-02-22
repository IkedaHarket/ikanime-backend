import { FindOptions, PaginationResponse } from "../../../../core/interfaces";

import * as Domain from "../../";

export interface FindEpisodeUseCase{
    execute(findOptions: FindOptions<Domain.EpisodeFindFilterDto>): Promise<PaginationResponse<Domain.Episode[]>>
}

export class FindEpisode implements FindEpisodeUseCase{
    
    constructor(
            private readonly episodeRepository: Domain.EpisodeRepository
        ){}

    async execute(findOptions: FindOptions<Domain.EpisodeFindFilterDto>): Promise<PaginationResponse<Domain.Episode[]>> {
        
        const { records, totalRecords } = await this.episodeRepository.find(findOptions)
        const { limit, page } = findOptions.paginationDto
        const totalPages = Math.ceil(totalRecords / limit);
        return {
            limit,
            page,
            next: (page < totalPages ) ? `/api/anime/episode?page=${ ( page + 1 ) }&limit=${ limit }` : null ,
            prev: (page - 1 > 0) ? `/api/anime/episode?page=${ ( page - 1 ) }&limit=${ limit }` : null ,
            records,
            total: totalRecords
        }
    }
}