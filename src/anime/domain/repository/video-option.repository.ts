import { FindOptions, FindResponse } from "../../../core/interfaces";
import * as Domain from '../../'

export abstract class VideoOptionRepository{
    abstract find(findOptions: FindOptions<Domain.VideoOptionFindFilterDto>): Promise<FindResponse<Domain.VideoOption[]>>
}