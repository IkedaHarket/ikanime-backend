import { PaginationResponse, FindOptions } from "../../../../core/interfaces";

import * as Domain from "../..";

export interface FindStateUseCase{
    execute(findOptions: FindOptions<undefined>): Promise<PaginationResponse<Domain.State[]>>
}

export class FindState implements FindStateUseCase{
    
    constructor(
            private readonly stateRepository: Domain.StateRepository
        ){}

    async execute(findOptions: FindOptions<undefined>): Promise<PaginationResponse<Domain.State[]>> {
        const { records, totalRecords } = await this.stateRepository.find(findOptions)
        const { limit, page } = findOptions.paginationDto
        const totalPages = Math.ceil(totalRecords / limit);
        return {
            limit,
            page,
            next: (page < totalPages ) ? `/api/anime/state/find?page=${ ( page + 1 ) }&limit=${ limit }` : null ,
            prev: (page - 1 > 0) ? `/api/anime/state/find?page=${ ( page - 1 ) }&limit=${ limit }` : null ,
            records,
            total: totalRecords
        }
    }

}