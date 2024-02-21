import { FindOptions, FindResponse } from '../../../core/interfaces';

import { Episode } from '../../'

export abstract class EpisodeRepository{
    abstract find(findOptions: FindOptions): Promise<FindResponse<Episode[]>>
}