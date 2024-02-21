import { PaginationResponse } from '@core/interfaces/pagination-response';
import { Criteria } from '@core/models';
import { Anime } from '@anime';

export abstract class AnimeRepository{
    abstract find(filter?: Criteria<Object>): Promise<PaginationResponse<Anime[]>>
}
