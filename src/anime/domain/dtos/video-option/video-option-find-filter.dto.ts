export class VideoOptionFindFilterDto {

    private constructor(
      public animeEpisodeId: string,
      public readonly logic: 'AND' | 'OR',
    ) {}
  
    static create( object: { [key: string]: any } ): [string?, VideoOptionFindFilterDto?] {
        const { animeEpisodeId = null, logic = 'AND' } = object
        if(!(typeof animeEpisodeId === 'string' || animeEpisodeId === null)) return ['animeId must be string or null']
        if( !['AND', 'OR'].includes(logic) ) return ['logic must be AND or OR']
        return [ undefined, new VideoOptionFindFilterDto(animeEpisodeId,logic) ];
    }
  
  }