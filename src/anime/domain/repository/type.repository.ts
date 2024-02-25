import { FindOptions, FindResponse } from '../../../core/interfaces'

import * as Domain from '../..';

export abstract class TypeRepository{
    abstract find(findOptions: FindOptions<undefined>): Promise<FindResponse<Domain.Type[]>>
}
