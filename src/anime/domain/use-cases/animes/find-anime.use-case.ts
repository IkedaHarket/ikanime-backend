import { PaginationResponse, FindOptions } from "../../../../core/interfaces/";

import * as Domain from "../../";

export interface FindAnimeUseCase{
    execute(findOptions: FindOptions<Domain.AnimeFindFilterDto>): Promise<PaginationResponse<Domain.Anime[]>>
}

export class FindAnime implements FindAnimeUseCase{
    
    constructor(
            private readonly animeRepository: Domain.AnimeRepository
        ){}

    async execute(findOptions: FindOptions<Domain.AnimeFindFilterDto>): Promise<PaginationResponse<Domain.Anime[]>> {
        const { records, totalRecords } = await this.animeRepository.find(findOptions)
        const { limit, page } = findOptions.paginationDto
        const totalPages = Math.ceil(totalRecords / limit);
        return {
            limit,
            page,
            next: (page < totalPages ) ? `/api/anime/find?page=${ ( page + 1 ) }&limit=${ limit }` : null ,
            prev: (page - 1 > 0) ? `/api/anime/find?page=${ ( page - 1 ) }&limit=${ limit }` : null ,
            records,
            total: totalRecords
        }
    }

}