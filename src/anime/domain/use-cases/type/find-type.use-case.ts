import { PaginationResponse, FindOptions } from "../../../../core/interfaces";

import * as Domain from "../..";

export interface FindTypeUseCase{
    execute(findOptions: FindOptions<undefined>): Promise<PaginationResponse<Domain.Type[]>>
}

export class FindType implements FindTypeUseCase{
    
    constructor(
            private readonly typeRepository: Domain.TypeRepository
        ){}

    async execute(findOptions: FindOptions<undefined>): Promise<PaginationResponse<Domain.Type[]>> {
        const { records, totalRecords } = await this.typeRepository.find(findOptions)
        const { limit, page } = findOptions.paginationDto
        const totalPages = Math.ceil(totalRecords / limit);
        return {
            limit,
            page,
            next: (page < totalPages ) ? `/api/anime/type/find?page=${ ( page + 1 ) }&limit=${ limit }` : null ,
            prev: (page - 1 > 0) ? `/api/anime/type/find?page=${ ( page - 1 ) }&limit=${ limit }` : null ,
            records,
            total: totalRecords
        }
    }

}