import { CustomError } from "../../../../core/models"

export class EpisodeFindFilterDto {

    private constructor(
      public readonly animeId: string | null,
      public readonly logic: 'AND' | 'OR',
      public readonly orderBy: { createdAt: 'desc' | 'asc' },
    ) {}
  
    static create( object: { [key: string]: any } ): EpisodeFindFilterDto {
        const { animeId = null, orderBy = { createdAt: 'desc' }, logic = 'AND' } = object
        if(!(typeof animeId === 'string' || animeId === null)) throw CustomError.badRequest('animeId must be string or null')
        if( !['AND', 'OR'].includes(logic) ) throw CustomError.badRequest('logic must be AND or OR')
        if (!['desc', 'asc'].includes(orderBy.createdAt)) throw CustomError.badRequest('createdAt must be asc or desc')

        return new EpisodeFindFilterDto(animeId, logic, orderBy) ;
    }
  
  }