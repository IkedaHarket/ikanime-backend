import { FindOptions, FindResponse } from '../../../core/interfaces'
import { Anime } from '../../';

export abstract class AnimeRepository{
    abstract find(findOptions: FindOptions): Promise<FindResponse<Anime[]>>
}
