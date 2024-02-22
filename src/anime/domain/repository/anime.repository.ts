import { FindOptions, FindResponse } from '../../../core/interfaces'
import { Anime } from '../../';
import { AnimeFindFilterDto } from '../dtos/anime/anime-find-filter.dto';

export abstract class AnimeRepository{
    abstract find(findOptions: FindOptions<AnimeFindFilterDto>): Promise<FindResponse<Anime[]>>
}
