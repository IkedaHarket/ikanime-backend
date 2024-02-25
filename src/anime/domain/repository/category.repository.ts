import { FindOptions, FindResponse } from '../../../core/interfaces'

import * as Domain from '../../';

export abstract class CategoryRepository{
    abstract find(findOptions: FindOptions<undefined>): Promise<FindResponse<Domain.Category[]>>
}
