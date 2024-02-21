import { PaginationResponse } from "@core/interfaces";
import { Episode } from '@anime'
import { Criteria } from "@core/models";


export abstract class EpisodeRepository{
    abstract find(filter?: Criteria<Object>): Promise<PaginationResponse<Episode[]>>
}