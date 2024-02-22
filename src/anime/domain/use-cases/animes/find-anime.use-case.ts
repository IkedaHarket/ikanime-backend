import { PaginationResponse, FindOptions } from "../../../../core/interfaces/";
import { AnimeRepository, Anime } from "../../../";
import { AnimeFindFilterDto } from "../../dtos/anime/anime-find-filter.dto";

export interface FindAnimeUseCase{
    execute(findOptions: FindOptions<AnimeFindFilterDto>): Promise<PaginationResponse<Anime[]>>
}

export class FindAnime implements FindAnimeUseCase{
    
    constructor(
            private readonly animeRepository: AnimeRepository
        ){}

    async execute(findOptions: FindOptions<AnimeFindFilterDto>): Promise<PaginationResponse<Anime[]>> {
        const { records, totalRecords } = await this.animeRepository.find(findOptions)
        const { limit, page } = findOptions.paginationDto
        const totalPages = Math.ceil(totalRecords / limit);
        return {
            limit,
            page,
            next: (page < totalPages ) ? `/api/anime?page=${ ( page + 1 ) }&limit=${ limit }` : null ,
            prev: (page - 1 > 0) ? `/api/anime?page=${ ( page - 1 ) }&limit=${ limit }` : null ,
            records,
            total: totalRecords
        }
    }

}