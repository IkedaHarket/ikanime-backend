export class EpisodeFindFilterDto {

    private constructor(
      public readonly animeId: string | null,
      public readonly logic: 'AND' | 'OR',
      public readonly orderBy: { createdAt: 'desc' | 'asc' },
    ) {}
  
    static create( object: { [key: string]: any } ): [string?, EpisodeFindFilterDto?] {
        const { animeId = null, orderBy = { createdAt: 'desc' }, logic = 'AND' } = object
        if(!(typeof animeId === 'string' || animeId === null)) return ['animeId must be string or null']
        if( !['AND', 'OR'].includes(logic) ) return ['logic must be AND or OR']
        if (!['desc', 'asc'].includes(orderBy.createdAt)) return ['createdAt must be asc or desc']

        return [ undefined, new EpisodeFindFilterDto(animeId, logic, orderBy) ];
    }
  
  }