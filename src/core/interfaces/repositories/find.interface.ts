import { PaginationDto } from "../../dtos"

export interface FindOptions<T>{
    filter: T
    paginationDto: PaginationDto
}

export interface FindResponse<T>{
    totalRecords: number
    records: T
}