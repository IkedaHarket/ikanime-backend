import { FindOptions, FindResponse } from '../../../core/interfaces';

import * as Domain from '../../'

export abstract class EpisodeRepository{
    abstract find(findOptions: FindOptions<Domain.EpisodeFindFilterDto>): Promise<FindResponse<Domain.Episode[]>>
}