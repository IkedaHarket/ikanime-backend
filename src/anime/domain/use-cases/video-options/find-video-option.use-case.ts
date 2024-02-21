import { PaginationResponse } from "../../../../core/interfaces";
import { Criteria } from "../../../../core/models";

import { VideoOption, VideoOptionRepository } from "../../../";

export interface FindVideoOptionUseCase {
    execute(filter?: Criteria<Object>): Promise<PaginationResponse<VideoOption[]>>
}

export class FindVideoOption implements FindVideoOptionUseCase{
    
    constructor(
            private readonly videoOptionRepository: VideoOptionRepository
        ){}

    execute(filter?: Criteria<Object>): Promise<PaginationResponse<VideoOption[]>> {
        // return this.videoOptionRepository.find(filter)
        throw new Error()
    }
}