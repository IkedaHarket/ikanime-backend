export interface PaginationResponse<T>{
    page: number
    limit: number
    total: number
    next: string | null
    prev: string | null
    records: T
}