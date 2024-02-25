import { PaginationResponse, FindOptions } from "../../../../core/interfaces";

import * as Domain from "../..";

export interface FindCategoryUseCase{
    execute(findOptions: FindOptions<undefined>): Promise<PaginationResponse<Domain.Category[]>>
}

export class FindCategory implements FindCategoryUseCase{
    
    constructor(
            private readonly categoryRepository: Domain.CategoryRepository
        ){}

    async execute(findOptions: FindOptions<undefined>): Promise<PaginationResponse<Domain.Category[]>> {
        const { records, totalRecords } = await this.categoryRepository.find(findOptions)
        const { limit, page } = findOptions.paginationDto
        const totalPages = Math.ceil(totalRecords / limit);
        return {
            limit,
            page,
            next: (page < totalPages ) ? `/api/anime/category/find?page=${ ( page + 1 ) }&limit=${ limit }` : null ,
            prev: (page - 1 > 0) ? `/api/anime/category/find?page=${ ( page - 1 ) }&limit=${ limit }` : null ,
            records,
            total: totalRecords
        }
    }

}