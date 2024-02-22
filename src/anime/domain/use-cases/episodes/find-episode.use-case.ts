import { FindOptions, PaginationResponse } from "../../../../core/interfaces";
import { EpisodeRepository, Episode, EpisodeFindFilterDto } from "../../../";

export interface FindEpisodeUseCase{
    execute(findOptions: FindOptions<EpisodeFindFilterDto>): Promise<PaginationResponse<Episode[]>>
}

export class FindEpisode implements FindEpisodeUseCase{
    
    constructor(
            private readonly episodeRepository: EpisodeRepository
        ){}

    async execute(findOptions: FindOptions<EpisodeFindFilterDto>): Promise<PaginationResponse<Episode[]>> {
        
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