export class EpisodeFindFilterDto {

    private constructor(
      public readonly animeId: string | null,
      public readonly logic: 'AND' | 'OR',
    ) {}
  
    static create( object: { [key: string]: any } ): [string?, EpisodeFindFilterDto?] {
        const { animeId = null, logic = 'AND' } = object
        if(!(typeof animeId === 'string' || animeId === null)) return ['animeId must be string or null']
        if( !['AND', 'OR'].includes(logic) ) return ['logic must be AND or OR']
        return [ undefined, new EpisodeFindFilterDto(animeId, logic) ];
    }
  
  }