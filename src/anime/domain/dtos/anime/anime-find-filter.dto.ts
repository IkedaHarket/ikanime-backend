

export class AnimeFindFilterDto {

    private constructor(
      public readonly logic: 'AND' | 'OR',
      public readonly orderBy: { createdAt: 'desc' | 'asc' },
    ) {}
  
    static create( object: { [key: string]: any } ): [string?, AnimeFindFilterDto?] {
        const { orderBy = { createdAt: 'desc' }, logic = 'AND' } = object
        if( !['AND', 'OR'].includes(logic) ) return ['logic must be AND or OR']
        if (!['desc', 'asc'].includes(orderBy.createdAt)) return ['createdAt must be asc or desc']

        return [ undefined, new AnimeFindFilterDto(logic, orderBy) ];
    }
  
  }