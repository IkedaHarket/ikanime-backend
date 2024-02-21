export class EpisodeFindFilterDto {

    private constructor(
      public readonly animeId: string | null,
    ) {}
  
    static create( object: { [key: string]: any } ): [string?, EpisodeFindFilterDto?] {
        const { animeId = null } = object
        if(!(typeof animeId === 'string' || animeId === null)) return ['animeId must be string or null']
        
        return [ undefined, new EpisodeFindFilterDto(animeId) ];
    }
  
  }