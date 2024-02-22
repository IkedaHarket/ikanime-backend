import { FindOptions, FindResponse } from '../../../core/interfaces';

import { Episode, EpisodeFindFilterDto } from '../../'

export abstract class EpisodeRepository{
    abstract find(findOptions: FindOptions<EpisodeFindFilterDto>): Promise<FindResponse<Episode[]>>
}