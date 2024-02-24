import { CustomError } from "../../../../core/models"

export class VideoOptionFindFilterDto {

    private constructor(
      public animeEpisodeId: string,
      public readonly logic: 'AND' | 'OR',
    ) {}
  
    static create( object: { [key: string]: any } ):  VideoOptionFindFilterDto {
        const { animeEpisodeId = null, logic = 'AND' } = object
        if(!(typeof animeEpisodeId === 'string' || animeEpisodeId === null)) throw CustomError.badRequest('animeId must be string or null')
        if( !['AND', 'OR'].includes(logic) ) throw CustomError.badRequest('logic must be AND or OR')

        return  new VideoOptionFindFilterDto(animeEpisodeId,logic) ;
    }
  
  }