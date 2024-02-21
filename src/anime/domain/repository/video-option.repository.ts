import { PaginationResponse } from "@core/interfaces";
import { VideoOption } from '@anime'
import { Criteria } from "@core/models";

export abstract class VideoOptionRepository{
    abstract find(filter?: Criteria<Object>): Promise<PaginationResponse<VideoOption[]>>
}