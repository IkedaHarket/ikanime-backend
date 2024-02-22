import { FindOptions, FindResponse } from '../../../core/interfaces'

import * as Domain from '../../';

export abstract class AnimeRepository{
    abstract find(findOptions: FindOptions<Domain.AnimeFindFilterDto>): Promise<FindResponse<Domain.Anime[]>>
}
