import { FindOptions, PaginationResponse } from "../../../../core/interfaces";

import * as Domain from "../../";

export interface FindVideoOptionUseCase {
    execute(findOptions: FindOptions<Domain.VideoOptionFindFilterDto>): Promise<PaginationResponse<Domain.VideoOption[]>>
}

export class FindVideoOption implements FindVideoOptionUseCase{
    
    constructor(
            private readonly videoOptionRepository: Domain.VideoOptionRepository
        ){}

    async execute(findOptions: FindOptions<Domain.VideoOptionFindFilterDto>): Promise<PaginationResponse<Domain.VideoOption[]>> {
        const { records, totalRecords } = await this.videoOptionRepository.find(findOptions)
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