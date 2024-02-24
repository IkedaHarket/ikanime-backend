import { CustomError } from "../../../../core/models";


export class AnimeFindFilterDto {

    private constructor(
      public readonly logic: 'AND' | 'OR',
      public readonly orderBy: { createdAt: 'desc' | 'asc' },
      public readonly name?: { contains?: string },
    ) {}
  
    static create( object: { [key: string]: any } ):  AnimeFindFilterDto {
        const { name, orderBy = { createdAt: 'desc' }, logic = 'AND' } = object
        if( !['AND', 'OR'].includes(logic) ) CustomError.badRequest('logic must be AND or OR')
        if(!['desc', 'asc'].includes(orderBy.createdAt)) CustomError.badRequest('createdAt must be asc or desc')

        return  new AnimeFindFilterDto(logic, orderBy, name) ;
    }
  
  }