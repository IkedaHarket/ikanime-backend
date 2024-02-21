import { PaginationDto } from "../../dtos"
import { Criteria } from "../../models"


export interface FindOptions{
    filter?: Criteria<Object>
    paginationDto: PaginationDto
}

export interface FindResponse<T>{
    totalRecords: number
    records: T
}